#!/usr/bin/env python
# -*- coding:utf-8 -*-
# trpg client 发布脚本 in linode

import os
import io
from fabric.api import *

# secret scope
env.hosts = []
env.key_filename = ''
env.user = ''

lcpdist = ""


def alter(file, old_str, new_str):
    """
    将替换的字符串写到一个新的文件中，然后将原文件删除，新文件改为原来文件的名字
    :param file: 文件路径
    :param old_str: 需要替换的字符串
    :param new_str: 替换的字符串
    :return: None
    """
    with io.open(file, "r", encoding="utf-8") as f1,io.open("%s.bak" % file, "w", encoding="utf-8") as f2:
        for line in f1:
            if old_str in line:
                line = line.replace(old_str, new_str)
            f2.write(line)
    os.remove(file)
    os.rename("%s.bak" % file, file)

def build():
    with lcd('./Client'):
        local('git pull')
        local('NODE_ENV=production TRPG_HOST=trpgapi.moonrailgun.com npm run build')

def copy():
    with lcd('./Client'):
        local('rm -rf ./dist/src')
        local('rm -rf %s*' % lcpdist)
        local('mkdir -p ./dist/src/assets')
        local('cp -r ./src/assets/* ./dist/src/assets/')
        local('cp -r ./dist/* %s' % lcpdist)


def redirect():
    alter('./Client/dist/index.html', 'vendor.js', 'https://asset.moonrailgun.com/vendor.js')
    alter('./Client/dist/index.html', 'src="app.', 'src="https://asset.moonrailgun.com/app.')

# 发布www
def deploy():
    build()
    redirect()
    copy()
    put('./Client/dist/*', '~/www/')

# 打包测试版apk
def build_android_test():
    local('rm -rf ./tmp/')
    local('mkdir -p ./tmp')
    local('cp -r ./Client ./tmp/')
    with lcd('./tmp/Client/android'):
        local('echo "MYAPP_RELEASE_STORE_FILE=trpg-android-test.keystore" >> ./gradle.properties')
        local('echo "MYAPP_RELEASE_KEY_ALIAS=trpg-android-test" >> ./gradle.properties')
        local('echo "MYAPP_RELEASE_STORE_PASSWORD=123456" >> ./gradle.properties')
        local('echo "MYAPP_RELEASE_KEY_PASSWORD=123456" >> ./gradle.properties')
        local('echo "android.enableAapt2=false" >> ./gradle.properties')
        with lcd('./app'):
            # 生成秘钥
            local('keytool -genkey -v -keystore trpg-android-test.keystore -alias trpg-android-test -keyalg RSA -keysize 2048 -validity 10000 -storepass 123456 -keypass 123456 -dname "CN=moonrailgun, OU=moonrailgun, O=moonrailgun, L=moonrailgun, ST=moonrailgun, C=中国"')
#         build_config = '''
# android {
#     signingConfigs {
#         release {
#             storeFile file(MYAPP_RELEASE_STORE_FILE)
#             storePassword MYAPP_RELEASE_STORE_PASSWORD
#             keyAlias MYAPP_RELEASE_KEY_ALIAS
#             keyPassword MYAPP_RELEASE_KEY_PASSWORD
#         }
#     }
#     buildTypes {
#         release {
#             signingConfig signingConfigs.release
#         }
#     }
# }
#         '''
#         local('echo "'+build_config+'" >> build.gradle') # 写入配置
        with lcd('../'):
            # client目录
            # 手动执行编译操作而不是让gradle执行
            # 以减少低配系统导致的编译超时自动退出的问题(猜测原因)
            local('mkdir -p android/app/build/intermediates/assets/release')
            local('mkdir -p android/app/build/intermediates/res/merged')
            local('node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --reset-cache --entry-file src/app/index.js --bundle-output android/app/build/intermediates/assets/release/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release')
        local('./gradlew --stop') # 停止后台进程
        local('./gradlew assembleRelease --info -x ":app:bundleReleaseJsAndAssets"') # 编译
        print('编译文件路径: ./tmp/Client/android/app/build/outputs/apk/')
        put('./app/build/outputs/apk/', '~/www/')

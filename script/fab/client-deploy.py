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

def deploy():
    build()
    redirect()
    copy()
    put('./Client/dist/*', '~/www/')

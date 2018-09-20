#!/bin/bash
cd `dirname $0`
echo '当前目录:'$(pwd)
echo "node 版本:"$(node --version)

modules=$(cat ./modules)
dist='./server'
mkdir -p $dist

echo '目标目录:'$dist

for module in ${modules[@]}
do
  echo "正在下载项目:"$module
  curl -o "${dist}/${module}.zip" -L "https://github.com/TRPGEngine/"$module"/archive/master.zip"
  unzip -d $dist "${dist}/${module}.zip"
  echo "完毕."
done

ls
for file in `find ${dist} -name "*-master" -type d`
do
  echo "正在更名":$file
  mv $file ${file/-master/}
done
echo "更名完成..."

echo "当前模块文件夹:"
find $dist -type d -maxdepth 1

echo "开始安装依赖文件:"

for module in ${modules[@]}
do
  echo "===============================正在转入${dist}/${module}"
  (
    cd $dist/$module
    npm install
  )
  echo "==============================="
done

echo "安装完毕,清理临时文件.."
rm -rf ./${dist}/*.zip
echo "安装完成."

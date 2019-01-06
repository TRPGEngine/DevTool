#!/bin/bash
cd `dirname $0`
echo '当前目录:'$(pwd)
echo "node 版本:"$(node --version)

modules=$(cat ./modules)
dist='./server'
mkdir -p $dist

echo '目标目录:'$dist

echo "开始更新服务器文件版本:"
for module in ${modules[@]}
do
  echo "===============================正在转入${dist}/${module}"
  (
    cd $dist/$module
    git pull
  )
  echo "==============================="
done

echo "开始更新服务器文件依赖:"
for module in ${modules[@]}
do
  echo "===============================正在转入${dist}/${module}"
  (
    cd $dist/$module
    npm install
  )
  echo "==============================="
done

echo "更新完毕."

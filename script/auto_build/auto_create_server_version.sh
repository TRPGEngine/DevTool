#!/bin/bash
# 用于创建可追踪的远程服务版本。方便开发与更新
cd `dirname $0`
echo '当前目录:'$(pwd)
echo "node 版本:"$(node --version)

modules=$(cat ./modules)
dist='./server'
mkdir -p $dist

echo '目标目录:'$dist

for module in ${modules[@]}
do
  echo "正在克隆项目:"$module
  $(
    cd $dist
    git clone "https://github.com/TRPGEngine/"$module".git"
  )
  echo "完毕."
done

echo "克隆完成."

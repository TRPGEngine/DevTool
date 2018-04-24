#!/bin/sh
inv=`pwd`

pn=(
"Core"
"Actor"
"Chat"
"Player"
"DevTool"
"Dice"
"File"
"Group"
"Dashboard"
)

for p in ${pn[@]}
do
  echo "正在下载项目:"$p
  curl -o $p"-master.zip" -L "https://github.com/TRPGEngine/"$p"/archive/master.zip"
  unzip $p"-master.zip"
done

echo "克隆完毕"

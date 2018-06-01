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
"Note"
"Dashboard"
"Help"
"QQConnect"
)

for p in ${pn[@]}
do
  echo "===============================正在转入"$inv/$p
  cd $inv/$p
  if [[ ! -n $1 ]]; then
    git pull
  else
    $1
  fi
  echo "==============================="
done

echo "命令 "$1" 执行完毕"

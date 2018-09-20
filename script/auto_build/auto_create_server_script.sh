#!/bin/bash
cd `dirname $0`
echo '当前目录:'$(pwd)

modules=$(cat ./modules | awk 'NR!=1{print}')
dist='./server.js'

if [[ -f $dist ]];then
  read -p "服务器文件已存在，是否重新生成(y/n) : " ret
  if [[ $ret == 'y' ]]; then
    echo "" > $dist
  else
    echo "退出脚本"
    exit 0
  fi
fi

read -p "请输入数据库地址(localhost):" dbhost
if [[ ! $dbhost ]]; then
  dbhost='localhost'
fi

read -p "请输入数据库名(trpg):" dbname
if [[ ! $dbname ]]; then
  dbname='trpg'
fi

read -p "请输入数据库账号(root):" dbuser
if [[ ! $dbuser ]]; then
  dbuser='root'
fi

read -p "请输入数据库密码:" -s dbpass
if [[ ! $dbpass ]]; then
  dbpass=''
fi

echo "const app = require('./Core/')({storageUrl: 'mysql://${dbuser}:${dbpass}@${dbhost}/${dbname}?debug=true'});" >> $dist

for module in ${modules[@]}
do
  lm=$(echo $module | tr '[A-Z]' '[a-z]')
  echo "const ${lm} = require('./${module}/');" >> $dist
done

echo "" >> $dist
echo "app.set('webserviceHomepage', '/admin/home');" >> $dist

for module in ${modules[@]}
do
  lm=$(echo $module | tr '[A-Z]' '[a-z]')
  if [[ $lm == 'file' ]]; then
    # 需要调用的
    echo "app.load(${lm}());" >> $dist
  else
    # 不需要调用的
    echo "app.load(${lm});" >> $dist
  fi
done

echo "app.run();" >> $dist
echo "module.exports = app;" >> $dist

echo ""
echo "生成完毕。"
echo "————————————文件如下——————————"
cat "./server.js"
echo "—————————————————————————————"

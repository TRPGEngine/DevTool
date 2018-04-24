ls
for file in `find . -name "*-master" -type d`
  do
    echo "正在更名":$file
    mv $file ${file/-master/}
  done
echo "更名完成"

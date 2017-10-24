logfile="outlog"
echo "检查日志文件"logfile

echo "检查密码"
grep "password" "./"$logfile
echo "检查密码结束"

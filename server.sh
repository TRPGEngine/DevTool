echo "启动服务中..."
export DEBUG=trpg:*
nohup node script/server.js > outlog &
echo "服务启动完毕"

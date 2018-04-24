echo "正在准备项目..."
mkdir .tmp
$(
cd .tmp
cp ../foreachdownload.sh ./
sh ./foreachdownload.sh

cp ../rename.sh ./
sh ./rename.sh

rm *-master.zip
rm *.sh
)

echo "项目准备完毕, 开始构建"

docker build -t trpg-server .

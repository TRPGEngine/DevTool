#!/bin/bash

echo "停止TRPG依赖包..."
docker-compose -f docker_lib.yml -p trpg_lib down

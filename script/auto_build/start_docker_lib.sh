#!/bin/bash

echo "启动TRPG依赖包..."
docker-compose -f docker_lib.yml -p trpg_lib up -d

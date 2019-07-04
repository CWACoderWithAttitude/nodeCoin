#!/bin/sh
. ./settings.graalvm
docker build -f Dockerfile.graalvm --rm -t $imageName .
#docker run --rm -v $(pwd)/.:/usr/src/app -p $blockChainServerPort:8080 $imageName 
docker run -it --rm -v $(pwd)/.:/usr/src/app -p $blockChainServerPort:8080 $imageName 

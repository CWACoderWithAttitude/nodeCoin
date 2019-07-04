#!/bin/sh
. ./settings
docker build --rm -t $imageName .
docker run --rm -v $(pwd)/.:/usr/src/app -p $blockChainServerPort:8080 $imageName 

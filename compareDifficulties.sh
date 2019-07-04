#!/bin/sh

difficulty=1
difficulty=2

now=`date '+%Y-%m-%d_%H.%M.%S'`

curl -s http://127.0.0.1:49153?difficulty=$difficulty|jq '._chain | .[] | (.id|tostring) + " ; " + ._timestamp + " ; "+  (.nonce|tostring)' > nonces_$difficulty.csv

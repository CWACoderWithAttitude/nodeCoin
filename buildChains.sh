#!/bin/sh

difficulty=3
difficulty=4
difficulty=6


now=`date '+%Y-%m-%d_%H.%M.%S'`

echo requesting chain with difficulty $difficulty
echo depending on the difficulty this can take a moment
echo refer to the server console for more details...

curl -s http://127.0.0.1:49153?difficulty=$difficulty \
	> blockChain_$difficulty.json

#
# https://stackoverflow.com/questions/35365769/how-do-i-use-jq-to-convert-number-to-string
#
cat blockChain_$difficulty.json|jq '._chain | .[] | (.id|tostring) + " ; " + ._timestamp + " ; "+  (.nonce|tostring)' > "blockChain_timing_$difficulty"

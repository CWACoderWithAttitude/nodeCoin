#!/bin/sh
data="{from: lilli, to: bella, betrag: 2.3}"

#
# https://superuser.com/questions/149329/what-is-the-curl-command-line-syntax-to-do-a-post-request
#
#echo \
curl -s  http://localhost:49153/add \
	-d "data=$data" \
	-H \'Content-Type:application/json\' 

curl -s  http://localhost:49153/add \
        -d "data=$data" \
        -H \'Content-Type:application/json\'

curl -s  http://localhost:49153/add \
        -d "data=$data" \
        -H \'Content-Type:application/json\'

curl -s  http://localhost:49153/add \
        -d "data=$data" \
        -H \'Content-Type:application/json\'

#!/bin/bash

set -e

NODE_VERSION=$1
STACK_NAME=$2

echo "Installing Nodejs $NODE_VERSION"
curl -sL https://deb.nodesource.com/setup_$NODE_VERSION > setup_$NODE_VERSION.x && \
	chmod +x setup_$NODE_VERSION.x && \
	./setup_$NODE_VERSION.x && \
	apt install nodejs -y

output=$(samdev build & samdev deploy --stack-name $2  2>&1)
exitCode=${?}
echo "${output}"

commentStatus="Failed"
if [ "${exitCode}" == "0" ]; then
	commentStatus="Success"
fi


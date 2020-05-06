#!/bin/bash

set -e

echo "Installing Nodejs $1"
curl -sL https://deb.nodesource.com/setup_${INPUT_node-version} > setup_${INPUT_node-version} && \
	chmod +x setup_${INPUT_node-version} && \
	./setup_${INPUT_node-version} && \
	apt install nodejs -y

output=$(samdev build & samdev deploy --stack-name ${INPUT_stack-name} 2>&1)
exitCode=${?}
echo "${output}"

commentStatus="Failed"
if [ "${exitCode}" == "0" ]; then
	commentStatus="Success"
fi


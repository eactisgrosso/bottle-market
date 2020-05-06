#!/bin/bash

set -e

printenv

echo "Installing Nodejs ${INPUT_NODE_VERSION}"
curl -sL https://deb.nodesource.com/setup_${INPUT_NODE_VERSION} > setup_${INPUT_NODE_VERSION} && \
	chmod +x setup_${INPUT_NODE_VERSION} && \
	./setup_${INPUT_NODE_VERSION} && \
	apt install nodejs -y

output=$(samdev build & samdev deploy --stack-name ${INPUT_STACK-NAME} 2>&1)
exitCode=${?}
echo "${output}"

commentStatus="Failed"
if [ "${exitCode}" == "0" ]; then
	commentStatus="Success"
fi


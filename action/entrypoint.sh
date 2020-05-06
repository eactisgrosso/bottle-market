#!/bin/bash

set -e

echo "Installing Nodejs $1"
curl -sL https://deb.nodesource.com/setup_${INPUT_NODEVERSION} > setup_${INPUT_NODEVERSION} && \
	chmod +x setup_${INPUT_NODEVERSION} && \
	./setup_${INPUT_NODEVERSION} && \
	apt install nodejs -y

output=$(samdev build & samdev deploy --stack-name ${INPUT_STACKNAME} 2>&1)
exitCode=${?}
echo "${output}"

commentStatus="Failed"
if [ "${exitCode}" == "0" ]; then
	commentStatus="Success"
fi


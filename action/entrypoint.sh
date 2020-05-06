#!/bin/bash

set -e

if [ "$INPUT_NODE_VERSION" != "" ]
then
	echo "Installing Nodejs $INPUT_NODE_VERSION"
	curl -sL https://deb.nodesource.com/setup_$INPUT_NODE_VERSION > setup_$INPUT_NODE_VERSION && \
		chmod +x setup_$INPUT_NODE_VERSION && \
		./setup_$INPUT_NODE_VERSION && \
		apt install nodejs -y
fi

echo "SAM Build"
samdev build

echo "SAM Deploy"
yes | samdev deploy --stack-name ${INPUT_STACK_NAME}



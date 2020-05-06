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
CMD_STRING="yes | samdev deploy --stack-name ${INPUT_STACK_NAME}"
if [ "$INPUT_PARAMETER_OVERRIDES" != "" ]
then
	CMD_STRING+= " --parameter-overrides $INPUT_PARAMETER_OVERRIDES";
fi

if [ "$INPUT_NO_FAIL_ON_EMPTY_CHANGESET" != "" && "$INPUT_NO_FAIL_ON_EMPTY_CHANGESET" != "false"]
then
	CMD_STRING+= " --no-fail-on-empty-changeset";
fi

RESULT=$($CMD_STRING)
echo $RESULT




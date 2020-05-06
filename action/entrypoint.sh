#!/bin/bash

set -e

if [[ -z "$INPUT_STACK_NAME" ]]; then
    echo Stack name invalid
    exit 1
fi

if [[ ! -z "$INPUT_NODE_VERSION" ]]; then
	echo "Installing Nodejs $INPUT_NODE_VERSION"
	curl -sL https://deb.nodesource.com/setup_$INPUT_NODE_VERSION > setup_$INPUT_NODE_VERSION && \
		chmod +x setup_$INPUT_NODE_VERSION && \
		./setup_$INPUT_NODE_VERSION && \
		apt install nodejs -y
fi

echo "SAM Build"
samdev build

echo "SAM Deploy"
if [[ -z "$INPUT_CAPABILITIES" ]]; then
    INPUT_CAPABILITIES="--capabilities CAPABILITY_IAM"
else
    INPUT_CAPABILITIES="--capabilities $INPUT_CAPABILITIES"
fi

if [[ ! -z "$INPUT_PARAMETER_OVERRIDES" ]]; then
    INPUT_PARAMETER_OVERRIDES="--parameter-overrides $INPUT_PARAMETER_OVERRIDES"
fi

if [[ $INPUT_NO_FAIL_ON_EMPTY_CHANGESET == true ]]; then
    INPUT_NO_FAIL_ON_EMPTY_CHANGESET="--no-fail-on-empty-changeset"
fi

yes | samdev deploy --stack-name $INPUT_STACK_NAME $INPUT_CAPABILITIES $INPUT_PARAMETER_OVERRIDES $INPUT_NO_FAIL_ON_EMPTY_CHANGESET





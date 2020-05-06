#!/bin/bash

set -u

function parseInputs(){
	# Required inputs
	if [ "${INPUT-NODE-VERSION}" == "" ]; then
		echo "Input node-version cannot be empty"
		exit 1
	fi
}

function installNode() {
	echo "Installing Nodejs ${INPUT-NODE-VERSION}"

    curl -sL https://deb.nodesource.com/setup_${INPUT-NODE-VERSION}.x > setup_${INPUT-NODE-VERSION}.x && \
        chmod +x setup_${INPUT-NODE-VERSION}.x && \
        ./setup_10${INPUT-NODE-VERSION}.x && \
        apt install nodejs -y
}

function runSam(){
	output=$(sam build & sam deploy 2>&1)
	exitCode=${?}
	echo "${output}"

	commentStatus="Failed"
	if [ "${exitCode}" == "0" ]; then
		commentStatus="Success"
	fi
}

function main(){
	parseInputs
	installNode
	runSam
}

main
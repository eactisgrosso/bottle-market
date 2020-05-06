#!/bin/bash

set -e

echo "Installing Nodejs $1"
curl -sL https://deb.nodesource.com/setup_$1 > setup_$1 && \
	chmod +x setup_$1 && \
	./setup_$1 && \
	apt install nodejs -y

output=$(samdev build & samdev deploy $2  2>&1)
exitCode=${?}
echo "${output}"

commentStatus="Failed"
if [ "${exitCode}" == "0" ]; then
	commentStatus="Success"
fi


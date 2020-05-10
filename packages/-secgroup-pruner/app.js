"use strict";

const AWS = require("aws-sdk");
const EC2 = new AWS.EC2();

function prune(groupId, port, query) {
  if (!groupId) throw new Error("Missing argument: groupId");
  if (!port) throw new Error("Missing argument: port");
  if (!query) throw new Error("Missing argument: query");

  return EC2.describeSecurityGroups({
    GroupIds: [groupId],
  })
    .promise()
    .then((data) => {
      const ipPermissions = data.SecurityGroups.length
        ? data.SecurityGroups[0].IpPermissions
        : [];
      var lambdasRanges = ipPermissions[0].IpRanges.filter(function (ipRange) {
        return ipRange.Description == query;
      });
      console.log("Lambdas ip ranges:", JSON.stringify(lambdasRanges));
      if (!lambdasRanges.length) return "No ip ranges for lambdas found";

      const params = {
        GroupId: groupId,
        IpPermissions: [
          {
            IpProtocol: "tcp",
            FromPort: port,
            ToPort: port,
            IpRanges: lambdasRanges,
          },
        ],
      };
      console.log("params:", JSON.stringify(params));
      return EC2.revokeSecurityGroupIngress(params).promise();
    });
}

exports.handler = (event, context, callback) => {
  console.log("Event:", JSON.stringify(event));
  return prune(event.groupId, event.port, event.query)
    .then((data) => callback(null, data))
    .catch(callback);
};

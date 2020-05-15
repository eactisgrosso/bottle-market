const axios = require("axios").default;

const AWS = require("aws-sdk");
const ec2 = new AWS.EC2({ region: "us-east-1" });

export class SecurityGroup {
  private groupId: string;

  constructor(id: string) {
    this.groupId = id;
  }

  public async addIpToInbound(port: number) {
    const response = await axios.get("http://icanhazip.com/");
    const ip = response.data.trim();
    console.log(`Add IP to Inbound: ${ip}`);

    var paramsIngress = {
      GroupId: this.groupId,
      IpPermissions: [
        {
          IpProtocol: "tcp",
          FromPort: port,
          ToPort: port,
          IpRanges: [{ CidrIp: `${ip}/32`, Description: "[APP]" }],
        },
      ],
    };
    await ec2.authorizeSecurityGroupIngress(paramsIngress, function (
      err: string,
      data: string
    ) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Ingress Successfully Set", data);
      }
    });
  }
}

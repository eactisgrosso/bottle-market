const AWS = require("aws-sdk");
const ssm = new AWS.SSM({ region: "us-east-1" });
const authClient = require("auth0").AuthenticationClient;

exports.handler = async (event, context, callback) => {
  const stage = process.env["STAGE"];

  try {
    let response = await ssm
      .getParameters({
        Names: [`/${stage}/AUTH0_CLIENT_ID`, `/${stage}/AUTH0_SECRET`],
        WithDecryption: false,
      })
      .promise();

    const client_id = response.Parameters[0].Value;
    const client_secret = response.Parameters[1].Value;

    const auth0 = new authClient({
      domain: "bottlehub.auth0.com",
      clientId: client_id,
      clientSecret: client_secret,
    });

    response = await auth0.clientCredentialsGrant({
      audience: "https://bottlehub.auth0.com/api/v2/",
    });
    console.log(response);

    const params = {
      Name: `/${stage}/AUTH0_TOKEN`,
      Value: response.access_token,
      Overwrite: true,
      Type: "String",
    };
    await ssm.putParameter(params).promise();

    callback(null);
  } catch (err) {
    callback(Error(err));
  }
};

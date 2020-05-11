const AWS = require("aws-sdk");
const ssm = new AWS.SSM({ region: "us-east-1" });

export default async function dbConfig() {
  let host = "localhost";
  if (process.env.NODE_ENV != "development") {
    const hostParam = await ssm
      .getParameter({
        Name: "/staging/DATABASE_HOST",
        WithDecryption: false,
      })
      .promise();
    host = hostParam.Parameter.Value;
  }

  const userdata = await ssm
    .getParameters({
      Names: ["/staging/DATABASE_USER", "/staging/DATABASE_PASSWORD"],
      WithDecryption: true,
    })
    .promise();

  const user = userdata.Parameters[1].Value;
  const pwd = userdata.Parameters[0].Value;

  return {
    client: "mysql",
    connection: {
      host: host,
      port: 3306,
      user: user,
      password: pwd,
      database: "bottlehub",
    },
  };
}

var AWS = require("aws-sdk");
var ssm = new AWS.SSM({ region: "us-east-1" });
var request = require("request");

exports.handler = function (event, context, callback) {
  var options = {
    method: "POST",
    url: "https://bottlehub.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body:
      '{"client_id":"KOTeZrgRumtW8yEcxgkzL6gFKjWFbpt3","client_secret":"_E4095mPMohjWakH4sqL8jH2sLzp0g0nrl2nfpj3tLbviDKR71I7bl-31co61OCf","audience":"http://localhost:4000/api","grant_type":"client_credentials"}',
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
};

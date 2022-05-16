import { Auth } from "aws-amplify";

const oauth = {
  domain: "financial-app.auth.eu-central-1.amazoncognito.com",
  scope: [
    "phone",
    "email",
    "profile",
    "openid",
    "aws.cognito.signin.user.admin",
  ],
  redirectSignIn: "http://localhost:3000/",
  redirectSignOut: "http://localhost:3000/",
  responseType: "code",
};
Auth.configure({
  oauth: oauth,
  region: "eu-central-1",
  userPoolId: "eu-central-1_Y7Cnvtu17",
  userPoolWebClientId: "5p7adfvdqea4ndn96vfinudcs8", // no secret
});

export default Auth;

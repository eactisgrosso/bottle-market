import React from "react";
import {
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  Divider,
} from "./SignInOutForm.style";
import { Facebook, Google } from "components/AllSvgIcon";
import { useAuth } from "contexts/auth/useAuth";

import { FormattedMessage } from "react-intl";

export default function SignInModal() {
  const { loginSocial } = useAuth();

  const loginWithGoogle = () => {
    loginSocial("google-oauth2");
  };

  const loginWithFacebook = () => {
    loginSocial("facebook");
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="welcomeBack" defaultMessage="Welcome Back" />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="loginText"
            defaultMessage="Login with your email &amp; password"
          />
        </SubHeading>

        <Button
          fullwidth
          title={"Continue with Facebook"}
          className="facebook"
          icon={<Facebook />}
          iconPosition="left"
          iconStyle={{ color: "#ffffff", marginRight: 5 }}
          intlButtonId="continueFacebookBtn"
          onClick={loginWithFacebook}
          style={{ color: "#fff" }}
        />

        <Button
          fullwidth
          title={"Continue with Google"}
          className="google"
          icon={<Google />}
          iconPosition="left"
          iconStyle={{ color: "#ffffff", marginRight: 5 }}
          intlButtonId="continueGoogleBtn"
          onClick={loginWithGoogle}
          style={{ color: "#fff" }}
        />

        <Divider>
          <span></span>
        </Divider>
      </Container>
    </Wrapper>
  );
}

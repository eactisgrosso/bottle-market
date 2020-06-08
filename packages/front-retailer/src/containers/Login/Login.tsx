import React, { useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import {
  Wrapper,
  FormWrapper,
  SubHeading,
  LogoImage,
  LogoWrapper,
} from "./Login.style";
import Button from "../../components/Button/Button";
import Logoimage from "../../image/BottleMarket.png";
import { Facebook, Google } from "../../components/AllSvgIcon";
import { useAuth } from "@bottle-market/common/auth";

export default () => {
  const { loginSocial } = useAuth();

  const loginWithGoogle = () => {
    loginSocial("google-oauth2");
  };

  const loginWithFacebook = () => {
    loginSocial("facebook");
  };

  return (
    <Wrapper>
      <FormWrapper>
        <LogoWrapper>
          <LogoImage src={Logoimage} alt="bottlehub-admin" />
        </LogoWrapper>
        <SubHeading>Log in de tiendas</SubHeading>
        <Button
          onClick={loginWithFacebook}
          startEnhancer={() => <Facebook />}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                color: "#fff",
                backgroundColor: "#4267b2",
                width: "100%",
                marginLeft: "auto",
                marginBottom: "10px",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                ":hover": {
                  backgroundColor: "#4267b2",
                  opacity: 0.9,
                },
              }),
            },
          }}
        >
          Continuar con Facebook
        </Button>
        <Button
          onClick={loginWithGoogle}
          startEnhancer={() => <Google />}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                backgroundColor: "#4285f4",
                width: "100%",
                marginLeft: "auto",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                ":hover": {
                  backgroundColor: "#4285f4",
                  opacity: 0.9,
                },
              }),
            },
          }}
        >
          Continuar con Google
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};

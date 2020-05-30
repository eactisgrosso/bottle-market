import React from "react";
import { Body, Footer, Message, Details } from "./Confirm.style";
import Button, { KIND, SIZE } from "../Button/Button";

export default function ConfirmMessage({ message, onClick }: any) {
  return (
    <div>
      <Body>
        <Message>
          <Details>{message}</Details>
        </Message>
      </Body>
      <Footer>
        <Button
          size={SIZE.compact}
          kind={KIND.primary}
          onClick={onClick}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                display: "inline-block",
                width: "40%",
                borderTopLeftRadius: "3px",
                borderTopRightRadius: "3px",
                borderBottomRightRadius: "3px",
                borderBottomLeftRadius: "3px",
                marginRight: "15px",
                backgroundColor: $theme.colors.red400,
                ":hover": {
                  backgroundColor: $theme.colors.red500,
                },
              }),
            },
          }}
        >
          Eliminar
        </Button>
      </Footer>
    </div>
  );
}

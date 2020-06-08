import * as React from "react";
import Popover, { PLACEMENT } from "../Popover/Popover";
import { PopoverWrapper } from "./Confirm.style";
import ConfirmMessage from "./ConfirmMessage";

export default function Confirm({ children, message, onClick }: any) {
  const click = (close) => {
    close();
    onClick();
  };

  return (
    <Popover
      content={({ close }) => (
        <ConfirmMessage message={message} onClick={() => click(close)} />
      )}
      accessibilityType={"tooltip"}
      placement={PLACEMENT.right}
      overrides={{
        Body: {
          style: {
            width: "350px",
            zIndex: 2,
          },
        },
        Inner: {
          style: {
            backgroundColor: "#ffffff",
          },
        },
      }}
    >
      <PopoverWrapper>{children}</PopoverWrapper>
    </Popover>
  );
}

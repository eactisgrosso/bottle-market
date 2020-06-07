import React from "react";
import { Plus, Minus } from "../../components/AllSvgIcon";
import Button, { SIZE, SHAPE } from "../Button/Button";

import { CounterBox, CounterValue } from "./Counter.style";
interface Props {
  onDecrement: (e: Event) => void;
  onIncrement: (e: Event) => void;
  value: number;
  variant?: string;
  className?: string;
}

export const Counter: React.FC<Props> = ({
  onDecrement,
  onIncrement,
  value,
  className,
}) => {
  const renderButton = (onClick: Function, icon: JSX.Element) => {
    return (
      <Button
        overrides={{
          StartEnhancer: {
            style: {
              marginRight: "0px",
              justifyContent: "center",
              height: "12px",
            },
          },
          BaseButton: {
            style: ({ $theme }) => {
              return {
                backgroundColor: "transparent",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "6px",
                paddingBottom: "6px",
                marginLeft: "0px",
                marginRight: "0px",
                marginTop: "0px",
                marginBottom: "0px",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "transparent",
                },
              };
            },
          },
        }}
        startEnhancer={() => icon}
        shape={SHAPE.pill}
        size={SIZE.mini}
        onClick={onClick}
      />
    );
  };

  return (
    <CounterBox>
      {renderButton(onDecrement, <Minus height={12} />)}
      <CounterValue>{value}</CounterValue>
      {renderButton(onIncrement, <Plus height={12} />)}
    </CounterBox>
  );
};

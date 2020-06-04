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
  return (
    <CounterBox>
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
                border: "none",
                backgroundColor: "transparent",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                padding: "10px",
                margin: "0px",
                cursor: "pointer",
                ":hover, :focus": {
                  outline: "none",
                  backgroundColor: "transparent",
                },
              };
            },
          },
        }}
        startEnhancer={() => <Minus height={12} />}
        shape={SHAPE.pill}
        size={SIZE.mini}
        onClick={onDecrement}
      />
      <CounterValue>{value}</CounterValue>
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
                border: "none",
                backgroundColor: "transparent",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                padding: "10px",
                margin: "0px",
                cursor: "pointer",
                ":hover, :focus": {
                  backgroundColor: "transparent",
                  outline: "none",
                },
              };
            },
          },
        }}
        startEnhancer={() => <Plus height={12} />}
        shape={SHAPE.pill}
        size={SIZE.mini}
        onClick={onDecrement}
      />
    </CounterBox>
  );
};

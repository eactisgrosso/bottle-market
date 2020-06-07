import { styled } from "baseui";

export const CounterBox = styled("div", ({ $theme }) => ({
  fontFamily: "'Lato', sans-serif",
  fontSize: "15px",
  fontWeight: 700,
  display: "flex",
  backgroundColor: $theme.colors.primary,
  color: "white",
  borderRadius: "38px",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "hidden",
  flexShrink: "0px",
  width: "96px",
  marginTop: "2px",
  marginBottom: "2px",
  marginRight: "2px",
  height: "36px",
  "&:focus": {
    outline: "none",
  },
}));

export const CounterValue = styled("span", ({ $theme }) => ({
  pointerEvents: "none",
}));

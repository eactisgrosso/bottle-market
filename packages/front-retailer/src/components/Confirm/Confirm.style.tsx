import { styled } from "baseui";

const getDetailsStyle = ({ $theme }) => {
  return $theme.typography.font14;
};

export const PopoverWrapper = styled("div", ({ $theme }) => ({
  display: "hidden",
  cursor: "pointer",
}));

export const Body = styled("div", ({ $theme }) => ({
  padding: "0 30px",
  display: "flex",
  flexDirection: "column",
}));

export const Message = styled("div", ({ $theme }) => ({
  padding: "20px 0",
  display: "flex",
  flexDirection: "column",
  borderBottom: `1px solid ${$theme.colors.borderF1}`,
  cursor: "pointer",
  ":last-child": {
    borderBottom: "0",
  },
}));

export const Details = styled("p", ({ $theme }) => ({
  margin: "0",
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textNormal,
  ...getDetailsStyle({ $theme }),
}));

export const Footer = styled("div", ({ $theme }) => ({
  padding: "15px 30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTop: `1px solid ${$theme.colors.borderE6}`,
}));

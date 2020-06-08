import { styled } from "baseui";

import { Row as Rows } from "react-flexbox-grid";

export const Row = styled(Rows, () => ({
  width: "320px",
  marginBottom: "10px",
  paddingLeft: "15px",
  ":last-child": {
    marginBottom: "0px",
    flexWrap: "nowrap",
    alignItems: "center",
  },
}));

export const Label = styled("label", ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,
}));

export const Days = styled("div", () => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "90px",
}));

export const Hours = styled("div", () => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  marginLeft: "30px",
  "@media only screen and (max-width: 400px)": {
    marginLeft: "15px",
  },
}));

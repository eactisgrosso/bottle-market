import { styled } from "baseui";

export const Card = styled("div", () => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "6px",
  backgroundColor: "#ffffff",
  marginLeft: "10px",
  marginRight: "10px",
  marginTop: "15px",
  paddingLeft: "30px",
  paddingRight: "30px",
  paddingTop: "30px",
  paddingBottom: "0px",
  "@media only screen and (min-width: 400px)": {
    width: "320px",
  },
}));

export const TopInfo = styled("div", () => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
}));

export const TitleWrapper = styled("div", () => ({
  width: "calc(100% - 60px)",
  display: "flex",
  flexDirection: "column",
}));

export const Title = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold16,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: "1.2",
  color: $theme.colors.textDark,
  marginBottom: "10px",
}));

export const SubTitle = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold13,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: "1.2",
  color: $theme.colors.textNormal,
  marginBottom: "0px",
}));

export const IconBox = styled("div", ({ $theme }) => ({
  width: "48px",
  height: "48px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const Detail = styled("div", () => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexWrap: "wrap",
  marginTop: "20px",
}));

export const Content = styled("div", () => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "baseline",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const Hours = styled("div", () => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "30px",
}));

export const Text = styled("span", ({ $theme }) => ({
  ...$theme.typography.font14,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: "1.2",
  color: $theme.colors.textNormal,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const PrimaryText = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold16,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: "1.2",
  color: $theme.colors.textNormal,
  margin: "10px 2px",
}));

export const ButtonContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  marginTop: "35px",
  marginBottom: "20px",
  justifyContent: "space-evenly",
}));

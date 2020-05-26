import { styled } from "baseui";

export const Card = styled("div", () => ({
  width: "320px",
  minWidth: "320px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "30px",
  borderRadius: "6px",
  backgroundColor: "#ffffff",
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
  padding: "15px 10px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexWrap: "wrap",
}));

export const Content = styled("div", () => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "baseline",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "5px",
}));

export const Text = styled("span", ({ $theme }) => ({
  ...$theme.typography.font16,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: "1.2",
  color: $theme.colors.textNormal,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const PrimaryText = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold18,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: "1.2",
  color: $theme.colors.textNormal,
  marginLeft: "10px",
}));

export const Color = styled("span", () => ({
  width: "15px",
  height: "15px",
  borderRadius: "50%",
  marginRight: "10px",
  marginTop: "3px",
  display: "flex",
  flexShrink: "0",
  alignItems: "flex-start",
}));

export const ButtonContainer = styled("div", ({ $theme }) => ({
  display: "block",
  marginTop: "20px",
  marginBottom: "-10px",
}));

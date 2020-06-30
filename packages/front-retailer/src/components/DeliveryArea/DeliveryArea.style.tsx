import { styled } from "baseui";

export const Wrapper = styled("div", () => ({
  width: "100%",
  textAlign: "center",
}));

export const SuggestionsWrapper = styled("ul", () => ({
  boxSizing: "border-box",
  backgroundColor: "#fff",
  zIndex: "10",
  width: "100%",
  listStyleType: "none",
  borderRadius: "0 0 3px 3px",
  padding: "0",
  margin: "4px 0 0",
  paddingBottom: "10px",
  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.16)",
  opacity: "1",
  transition: "opacity ease-in-out 500ms",
  textAlign: "left",
}));

export const ItemWrapper = styled("li", ({ $theme }) => ({
  padding: "0.7rem 1.5rem",
  cursor: "pointer",
  ...$theme.typography.font14,
  ":hover": {
    backgroundColor: "#f4f4f4",
  },
}));

import * as React from "react";
import Select from "./Select";

export default ({ ...props }) => {
  return (
    <Select
      overrides={{
        Popover: {
          props: {
            overrides: {
              Body: {
                style: { zIndex: 5 },
              },
            },
          },
        },
        Placeholder: {
          style: ({ $theme }) => ({
            ...$theme.typography.fontBold14,
            color: $theme.colors.textNormal,
          }),
        },
        SingleValue: {
          style: ({ $theme }) => ({
            ...$theme.typography.fontBold14,
            color: $theme.colors.textNormal,
          }),
        },
        Dropdown: { style: { maxHeight: "300px" } },
        DropdownListItem: {
          style: ({ $theme }) => ({
            ...$theme.typography.fontBold14,
            color: $theme.colors.textNormal,
          }),
        },
        OptionContent: {
          style: ({ $theme, $selected }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $selected
                ? $theme.colors.textDark
                : $theme.colors.textNormal,
            };
          },
        },
      }}
      {...props}
    />
  );
};

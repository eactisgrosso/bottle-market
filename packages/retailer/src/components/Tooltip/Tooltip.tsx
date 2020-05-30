import React from "react";
import { StatefulTooltip } from "baseui/tooltip";
import { useStyletron } from "baseui";

const Tooltip = ({ children, overrides, message }: any) => {
  const [css, theme] = useStyletron();

  return (
    <StatefulTooltip accessibilityType={"tooltip"} content={message}>
      <span
        className={css({
          borderBottomWidth: "1px",
          borderBottomColor: `${theme.colors.primary500}`,
          color: theme.colors.primary500,
        })}
        tabIndex={0}
      >
        {children}
      </span>
    </StatefulTooltip>
  );
};

export default Tooltip;

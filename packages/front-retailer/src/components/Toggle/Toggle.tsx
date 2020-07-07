import React from "react";
import { Checkbox as BaseCheckbox } from "baseui/checkbox";
import { STYLE_TYPE } from "baseui/checkbox";

type Props = {
  defaultValue?: boolean;
  onChange?: Function;
};

const Toggle: React.FC<Props> = ({ defaultValue, onChange }) => {
  const [checkboxes, setCheckboxes] = React.useState([
    defaultValue,
    defaultValue,
  ]);
  return (
    <BaseCheckbox
      checked={checkboxes[0]}
      onChange={(e) => {
        const nextCheckboxes = [...checkboxes];
        nextCheckboxes[0] = e.currentTarget.checked;
        setCheckboxes(nextCheckboxes);
        if (onChange)
          onChange({
            target: {
              value: e.currentTarget.checked,
            },
          });
      }}
      checkmarkType={STYLE_TYPE.toggle_round}
    ></BaseCheckbox>
  );
};

export default Toggle;

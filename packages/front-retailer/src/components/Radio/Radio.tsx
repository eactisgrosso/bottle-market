import React from "react";
import { Radio as BaseRadio, RadioGroup, ALIGN } from "baseui/radio";

interface IOption {
  name: string;
  value: string;
}
type Props = {
  options: IOption[];
  defaultValue?: string;
  onChange?: Function;
};
const Radio: React.FC<Props> = ({ options, defaultValue, onChange }) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <RadioGroup
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (onChange) onChange(e);
      }}
      name="number"
      align={ALIGN.horizontal}
      overrides={{
        RadioGroupRoot: {
          style: {
            marginBottom: "10px",
          },
        },
      }}
    >
      {options.map((option, index) => (
        <BaseRadio
          key={option.value}
          value={option.value}
          overrides={{
            Root: {
              style: {
                marginRight: "10%",
              },
            },
          }}
        >
          {option.name}
        </BaseRadio>
      ))}
    </RadioGroup>
  );
};

export default Radio;

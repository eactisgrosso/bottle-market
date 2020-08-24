import React, { useState, useEffect } from 'react';
import Select from '../Select/Select';

type Props = {
  placeholder?: string;
  initialValue?: number;
  onChange: Function;
};

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const TimePicker: React.FC<Props> = ({
  placeholder,
  initialValue,
  onChange,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    const opt = [];
    for (let i = 0; i < DAY; i += 1800) {
      opt.push({
        id: i,
        label: secondsToLabel(i),
      });
    }
    setOptions(opt);

    if (initialValue) {
      const o = opt.find((o) => o.id == initialValue);
      if (o)
        setValue([
          {
            id: o.id,
          },
        ]);
    }
    console.log(initialValue, options)
  }, []);

  const secondsToHourMinute = (seconds: number) => {
    const d = new Date(seconds * 1000);
    return [d.getUTCHours(), d.getUTCMinutes()];
  };

  const secondsToLabel = (seconds: number) => {
    let [hours, minutes] = secondsToHourMinute(seconds);
    const zeroPrefix = (n) => (n < 10 ? `0${n}` : n);

    return `${zeroPrefix(hours)}:${zeroPrefix(minutes)}`;
  };

  return (
    <Select
      clearable={false}
      options={options}
      placeholder={placeholder ? placeholder : ''}
      value={value}
      searchable={false}
      onChange={(params) => {
        if (onChange) onChange(params.value);
        setValue(params.value);
      }}
      overrides={{
        Dropdown: { style: { maxHeight: '200px' } },
        Placeholder: {
          style: ({ $theme }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $theme.colors.textNormal,
            };
          },
        },
        DropdownListItem: {
          style: ({ $theme }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $theme.colors.textNormal,
            };
          },
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
        SingleValue: {
          style: ({ $theme }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $theme.colors.textNormal,
            };
          },
        },
        Popover: {
          props: {
            overrides: {
              Body: {
                style: { zIndex: 5 },
              },
            },
          },
        },
      }}
    />
  );
};

export default TimePicker;

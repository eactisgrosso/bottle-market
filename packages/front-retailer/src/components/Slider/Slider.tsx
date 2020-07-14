import React, { useState, useEffect } from 'react';
import {
  SliderStyle,
  SliderWrapper,
  ValueContainer,
  Value,
  Unit,
  Input,
} from './Slider.style';

type SliderProps = {
  props?: any;
  min?: number;
  max?: number;
  initialValue?: number;
  unit?: string;
  onChange?: (e: any) => void;
};

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  initialValue,
  unit = '',
  onChange,
}) => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (initialValue != null) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleOnChange = (e) => {
    setValue(e.target.value);
    onChange(parseInt(e.target.value));
  };

  return (
    <SliderWrapper>
      <SliderStyle>
        <ValueContainer>
          <Value>{value}</Value>
          <Unit>{unit}</Unit>
        </ValueContainer>
        <Input
          type="range"
          min={min ? min : 0}
          max={max ? max : 100}
          value={value}
          onChange={handleOnChange}
        />
      </SliderStyle>
    </SliderWrapper>
  );
};

export default Slider;

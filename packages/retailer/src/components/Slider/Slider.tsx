import React, { useState } from "react";
import { SliderStyle, SliderWrapper } from "./Slider.style";

type SliderProps = {
  props?: any;
  min?: number;
  max?: number;
  unit?: string;
  onChange?: (e: any) => void;
};

const Slider: React.FC<SliderProps> = ({ min, max, unit = "", onChange }) => {
  const [value, setValue] = useState(2);

  const handleOnChange = (e) => {
    setValue(e.target.value);
    onChange(parseInt(e.target.value));
  };

  return (
    <SliderWrapper>
      <SliderStyle>
        <div className="valueContainer">
          <div className="value">{value}</div>
          <div className="unit">{unit}</div>
        </div>
        <input
          type="range"
          min={min ? min : 0}
          max={max ? max : 100}
          value={value}
          className="slider"
          onChange={handleOnChange}
        />
      </SliderStyle>
    </SliderWrapper>
  );
};

export default Slider;

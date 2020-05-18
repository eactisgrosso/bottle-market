import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const SliderWrapper = styled("div")`
  width: 100%;
  display: flex;
  padding: 10px;
  margin-top: 10px;
  border: 2px solid ${themeGet("colors.borderColor", "#f1f1f1")};
  border-radius: 15px;
  background: white;
`;

export const SliderStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: #888;
  .valueContainer {
    width: 10vh;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-right: 10px;
    border-right: 1px solid ${themeGet("colors.borderColor", "#f1f1f1")};
  }
  .value {
    font-size: 24px;
    display: inline-block;
  }
  .unit {
    margin-left: 5px;
    display: inline-block;
  }
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 12px;
    border-radius: 5px;
    background: ${themeGet("colors.sliderBg", "#009E7F")};
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      background: ${themeGet("colors.primary", "#009E7F")};
      cursor: pointer;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;
      border-radius: 50%;
    }
    &::-moz-range-thumb {
      width: 25px;
      height: 25px;
      background: ${themeGet("colors.primary", "#009E7F")};
      cursor: pointer;
      outline: 2px solid #333;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;
      border-radius: 50%;
    }
  }
`;

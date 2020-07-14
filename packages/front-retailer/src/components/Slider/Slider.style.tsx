import { styled } from 'baseui';

export const SliderWrapper = styled('div', ({ $theme }) => ({
  width: '100%',
  display: 'flex',
  padding: '10px',
  marginTop: '10px',
  border: '2px solid ' + $theme.colors.borderF1,
  borderRadius: '15px',
  background: 'white',
}));

export const SliderStyle = styled('div', () => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  color: '#888',
}));

export const Input = styled('input', ({ $theme }) => ({
  flex: 6,
  '-webkit-appearance': 'none',
  width: '100%',
  height: '12px',
  borderRadius: '5px',
  background: '#009E7F',
  outline: 'none',
  '::-webkit-slider-thumb': {
    '-webkit-appearance': 'none',
    appearance: 'none',
    width: '25px',
    height: '25px',
    background: '#009E7F',
    cursor: 'pointer',
    '-webkit-transition': '0.2s',
    transition: 'opacity 0.2s',
    borderRadius: '50%',
  },
  '::-moz-range-thumb': {
    width: '25px',
    height: '25px',
    background: '#009E7F',
    cursor: 'pointer',
    outline: '2px solid #333',
    '-webkit-transition': '0.2s',
    transition: 'opacity 0.2s',
    borderRadius: '50%',
  },
}));

export const ValueContainer = styled('div', ({ $theme }) => ({
  width: '10vh',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  marginRight: '10px',
  borderRight: '1px solid' + $theme.colors.borderF1,
}));

export const Value = styled('div', () => ({
  fontSize: '24px',
  display: 'inline-block',
}));

export const Unit = styled('div', () => ({
  marginLeft: '5px',
  display: 'inline-block',
}));

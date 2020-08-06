import { styled } from 'baseui';

//Styled

export const Title = styled('h1', ({ $theme }) => ({
  ...$theme.typography.fontBold18,
  color: $theme.colors.textDark,
  margin: '10px',
  minHeight: '48px',
  textAlign: 'center',
}));

export const SubtitlePrice = styled('h3', ({ $theme }) => ({
  ...$theme.typography.font16,
  color: $theme.colors.textDark,
  textAlign: 'center',
  margin: '10px 20px',
}));

export const SubtitleToogle = styled('h3', ({ $theme }) => ({
  ...$theme.typography.font16,
  color: $theme.colors.textDark,
  textAlign: 'center',
  margin: '10px 0',
}));

export const PurchasedPrice = styled('h3', ({ $theme }) => ({
  ...$theme.typography.font16,
  color: $theme.colors.primary,
  textAlign: 'center',
  margin: '10px',
}));

export const Description = styled('p', ({ $theme }) => ({
  ...$theme.typography.font16,
  color: $theme.colors.textNormal,
  marginBottom: 'auto',
  marginTop: '0px',
  minHeight: '48px',
  textAlign: 'justify',
  paddingBottom: '30px',

  '@media only screen and (max-width: 767px)': {
    ...$theme.typography.font14,
    margin: '30px 10px 0px 10px',
  },
}));

//Wrappers

export const ButtonsWrapper = styled('div', {
  marginTop: '30px',
  display: 'inline-flex',
  justifyContent: 'center',
  width: '100%',
  borderTop: '1px solid #bbb',
});

export const CarouselWrapper = styled('div', {
  margin: '20px 0px',
});
export const DetailsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 40px)',
  margin: '20px 0px',
  alignItems: 'center',
});

export const SalePriceWrapper = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  margin: '0 14px',
});

export const ToogleWrapper = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  margin: '0 14px',
});

export const TitlePriceWrapper = styled('div', {
  display: 'inline-flex',
  alignItems: 'baseline',
});

export const ControlsWrapper = styled('div', {
  display: 'inline-flex',
  justifyContent: 'center',
  marginTop: 'auto',

  '@media only screen and (max-width: 767px)': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 0',
  },
});

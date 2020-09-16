import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Link from 'next/link';

export const Items = styled.ol`
  margin: 0;
  padding-left: 0;
  list-style: none;
`;

export const Item = styled.li`
  display: inline;

  & + &::before {
    content: '';
    display: inline-block;
    transform: rotate(15deg);
    border-right: 1px solid;
    height: 13px;
    margin: 0 8px -0.2em;
  }

  > a {
    color: ${themeGet('colors.primary')};
    font-size: ${themeGet('fontSizes.1', '13')}px;
    text-decoration: none;
    border-bottom: 1px solid transparent;

    &:hover {
      border-color: currentColor;
    }

    &.active {
      border: none;
      color: red;
    }
  }
`;

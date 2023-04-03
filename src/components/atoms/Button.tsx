import { colors } from '@/styles/constants';
import styled from '@emotion/styled';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

type Props = ComponentPropsWithRef<'button'> & {
  text?: string;
  icon?: React.ReactNode;
  wFull?: boolean;
};

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, Props>(
  ({ icon, text, wFull = false, ...rest }, ref) => {
    const ButtonStyle = styled.button`
      background: ${colors.secondaryDark};
      border-radius: 6px;
      margin: 4px 0px;
      outline: none;
      border: none;
      padding: 12px;
      width: ${wFull ? '100%' : 'auto'};
      color: ${colors.light};
    `;

    return (
      <ButtonStyle ref={ref} {...rest}>
        {icon} {text}
      </ButtonStyle>
    );
  }
);

export default Button;

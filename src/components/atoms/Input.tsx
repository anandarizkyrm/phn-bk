import { colors } from '@/styles/constants';
import { colors } from '@/styles/constants';
import styled from '@emotion/styled';
import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  className?: string;
};

const InputStyle = styled.input`
  width: 100%;
  background-color: ${colors.secondaryDark};
  border: none;
  outline: none;
  padding: 12px;
  margin: 4px 0px;
  box-sizing: border-box;
`;
const InputStyle = styled.input`
  width: 100%;
  background-color: ${colors.secondaryDark};
  border: none;
  outline: none;
  padding: 12px;
  margin: 4px 0px;
  color: ${colors.light};
  box-sizing: border-box;
`;

// eslint-disable-next-line react/display-name
const Input: React.FC<InputProps> = React.forwardRef(
  (
    { type, placeholder, className, ...rest },
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <InputStyle
        className={className}
        type={type}
        placeholder={placeholder}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default Input;

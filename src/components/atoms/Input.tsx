import styled from '@emotion/styled';
import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  className?: string;
};

const InputStyle = styled.input``;

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

import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/constants';

type Props = {
  placeholder: string;
  icon: any;
  type?: string;
  value?: string | number;
  onChange?: any;
};

const Input = styled.input`
  width: 100%;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 12px 20px;
  outline: none;
  border: none;
  background-color: ${colors.secondaryDark};
  color: ${colors.light};

  &::placeholder {
    color: ${colors.light};
    letter-spacing: 1px;
  }
`;
const IconContainer = styled.div`
  position: absolute;
  top: 0.7rem;
  right: 1.2rem;
  color: ${colors.light};
`;

const InputContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const InputWithIcon = ({
  placeholder,
  icon,
  type = 'text',
  value,
  onChange,
}: Props) => {
  return (
    <InputContainer>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <IconContainer>{icon}</IconContainer>
    </InputContainer>
  );
};

export default InputWithIcon;

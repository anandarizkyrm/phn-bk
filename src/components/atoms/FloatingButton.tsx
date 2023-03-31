import { colors } from '@/styles/constants';
import styled from '@emotion/styled';
import React from 'react';

type Props = {
  icon: React.ReactNode;
};

const Button = styled.button`
  position: fixed;
  bottom: 72px;
  border-radius: 50%;
  right: 21px;
  padding: 8px;
  border: none;
  height: 42px;
  width: 42px;
  color: ${colors.primaryDark};
  background-color: ${colors.light};
`;

const FloatingButton = (props: Props) => {
  const { icon } = props;
  return <Button>{icon}</Button>;
};

export default FloatingButton;

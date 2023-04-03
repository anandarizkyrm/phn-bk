import { colors } from '@/styles/constants';
import styled from '@emotion/styled';
import React from 'react';

type Props = {
  message: string | undefined;
};

const ErrorP = styled.p`
  color: ${colors.darkred};
  font-size: 14px;
  margin-bottom: 4px;
`;

const ErrorMessage = (props: Props) => {
  const { message } = props;
  return <ErrorP>{message}</ErrorP>;
};

export default ErrorMessage;

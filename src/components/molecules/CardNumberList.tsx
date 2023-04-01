import { colors } from '@/styles/constants';
import styled from '@emotion/styled';
import React from 'react';

type Props = {
  number: string;
  index: number;
};

const NumberListContent = styled.div`
  border-bottom: 1px solid ${colors.secondaryDark};
  padding: 8px 0px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const CardNumberList = (props: Props) => {
  const { number, index } = props;
  return (
    <NumberListContent>
      <p>{number}</p>
      <p style={{ color: colors.secondaryDark }}>Phone Number {index}</p>
    </NumberListContent>
  );
};

export default CardNumberList;

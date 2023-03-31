import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

type Props = {
  icon: React.ReactNode;
  title: string;
  link: string;
};

const BottomLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.p`
    font-size: 12px;
    margin-top: 2px;
`
const BottomLinkItem = (props: Props) => {
  const { icon, title, link } = props;
  return (
    <Link href={link}>
      <BottomLink>
        {icon}
        <Title>{title}</Title>
      </BottomLink>
    </Link>
  );
};

export default BottomLinkItem;

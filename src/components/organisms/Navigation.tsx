import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import FloatingButton from '../atoms/FloatingButton';
import BottomNavigation from '../molecules/BottomNavigation';

type Props = {
  children: React.ReactNode;
  title: string;
};

const ChildrenContainer = styled.div`
  margin-top: 12px;
  margin-bottom: 32px;
`;

const Navigation = (props: Props) => {
  const { children, title } = props;
  return (
    <div>
      <h2>{title}</h2>
      <ChildrenContainer>{children}</ChildrenContainer>
      <Link href="/create">
        <FloatingButton icon={<FaPlus style={{ fontSize: '22px' }} />} />
      </Link>
      <BottomNavigation />
    </div>
  );
};

export default Navigation;

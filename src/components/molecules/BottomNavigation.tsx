import { colors } from '@/styles/constants';
import styled from '@emotion/styled';
import React from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import BottomLinkItem from '../atoms/BottomLinkItem';

const links = [
  {
    title: 'Contacts',
    link: '/',
    icon: <FaUser style={{ fontSize: '22px' }} />,
  },
  {
    title: 'Favorites',
    link: '/favorites',
    icon: <FaStar style={{ fontSize: '22px' }} />,
  },
];

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  background-color: ${colors.secondaryDark};
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px 0px;
  box-sizing: border-box;
  height: 3.2rem;
  left: 0;
`;

const BottomNavigation = () => {
    
  return (
    <BottomNavContainer>
      {links.map((link, idx) => (
        <BottomLinkItem
          title={link.title}
          icon={link.icon}
          link={link.link}
          key={idx}
        />
      ))}
    </BottomNavContainer>
  );
};

export default BottomNavigation;

import useAddOrRemoveFromFavorite from '@/hooks/useAddOrRemoveFavoriteContaxt';
import useDeleteContact from '@/hooks/useDeleteContact';
import { RoundedImage } from '@/styles';
import { colors } from '@/styles/constants';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';

type Props = {
  name: string;
  imageUrl: string;
  phoneNumber: string;
  id: string;
};

const CardContactWrapper = styled.div`
  display: flex;
  margin: 8px;
  padding-bottom: 12px;
  align-items: center;
  border-bottom: 1px solid ${colors.secondaryDark};
`;

const MiddleContent = styled.div`
  flex-grow: 1;
  padding-left: 12px;
  font-size: 12px;
`;

const PhoneFont = styled.span`
  color: ${colors.secondaryDark};
  font-weight: bold;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  cursor: pointer;
  gap: 12px;
  display: flex;
  top: 25%;
`;

const CardContact = ({ name, imageUrl, phoneNumber, id }: Props) => {
  const { handleAddOrRemoveFavorites, favoritesContactList } =
    useAddOrRemoveFromFavorite();
  const { handleDelete } = useDeleteContact(id);
  return (
    <div style={{ position: 'relative' }}>
      <Link href={`/detail/${id}`}>
        <CardContactWrapper>
          <RoundedImage>
            <Image src={imageUrl} alt={name} width="50" height={'50'}></Image>
          </RoundedImage>
          <MiddleContent>
            <p>{name}</p>
            <PhoneFont>{phoneNumber}</PhoneFont>
          </MiddleContent>
        </CardContactWrapper>
      </Link>
      {typeof window !== 'undefined' ? (
        <>
          <IconWrapper>
            <FaTrash
              onClick={handleDelete}
              style={{ color: colors.secondaryDark }}
            />
            <FaHeart
              data-testid="icon-heart"
              onClick={() => handleAddOrRemoveFavorites(id)}
              style={{
                color: favoritesContactList?.includes(id)
                  ? colors.darkred
                  : colors.light,
              }}
            />
          </IconWrapper>
        </>
      ) : null}
    </div>
  );
};

export default CardContact;

import { colors } from '@/styles/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  imageUrl: string;
  phoneNumber: string;
  id: string;
};

const CardContact = ({ name, imageUrl, phoneNumber, id }: Props) => {
  return (
    <Link
      style={{ textDecoration: 'none', color: colors.light }}
      href={`/detail/${id}`}
    >
      Blog Post
      <div>
        <Image src={imageUrl} alt={name} width="50" height={'50'}></Image>
        <p>{name}</p>
        <span>{phoneNumber}</span>
      </div>
    </Link>
  );
};

export default CardContact;

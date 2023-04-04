import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GET_DETAIL } from '../../api/gql';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { colors, others } from '@/styles/constants';
import { ContactType } from '../favorites';
import { MakeItCentered, RoundedImage } from '@/styles';
import styled from '@emotion/styled';
import CardNumberList from '@/components/molecules/CardNumberList';
import Navigation from '@/components/organisms/Navigation';
import { FaEdit, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 28px 0px;
  flex-direction: column;
`;

const Name = styled.h3`
  color: ${colors.light};
  margin-top: 18px;
`;

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_DETAIL, {
    variables: {
      id: id,
    },
  });
  const [contact, setContact] = useState<ContactType | undefined>();

  useEffect(() => {
    setContact(data?.contact_by_pk);
  }, [data]);

  if (loading)
    return (
      <MakeItCentered>
        <FaSpinner />
      </MakeItCentered>
    );
  return (
    <Navigation title="Back">
      <>
        <DetailContainer>
          <RoundedImage>
            <Image
              src={others.avatar}
              alt="Contact Name"
              width="100"
              height={'100'}
            ></Image>
          </RoundedImage>
          <Name>
            {contact?.first_name} {contact?.last_name}{' '}
            <Link href={`/edit/${id}`}>
              <FaEdit style={{ marginLeft: '6px' }} />
            </Link>
          </Name>
        </DetailContainer>

        {contact?.phones.map((phone, idx) => (
          <CardNumberList number={phone.number} index={idx + 1} key={idx} />
        ))}

        {error ? <MakeItCentered>Data {id} Not Found</MakeItCentered> : null}
      </>
    </Navigation>
  );
};

export default index;

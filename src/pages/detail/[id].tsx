import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GET_DETAIL } from '../../api/gql';
import { ApolloError } from '@apollo/client';
import Image from 'next/image';
import { colors, others } from '@/styles/constants';
import { client } from '../_app';
import { ContactType } from '../favorites';
import { MakeItCentered, RoundedImage } from '@/styles';
import styled from '@emotion/styled';
import CardNumberList from '@/components/molecules/CardNumberList';
import Navigation from '@/components/organisms/Navigation';
import { FaEdit } from 'react-icons/fa';
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

const index = ({
  data,
  error,
}: {
  data: { contact_by_pk: ContactType };
  error: ApolloError | undefined;
}) => {
  const router = useRouter();
  const { id } = router.query;

  const [contact, setContact] = useState<ContactType | undefined>();

  useEffect(() => {
    setContact(data?.contact_by_pk);
  }, [data]);

  console.log(contact);
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

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  try {
    const { data } = await client.query({
      query: GET_DETAIL,
      variables: {
        id: id,
      },
    });

    return { props: { data } };
  } catch (error) {
    return { props: { error: error } };
  }
}

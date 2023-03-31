import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GET_DETAIL } from '../../../api/gql';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { others } from '@/styles/constants';
import { FaSpinner } from 'react-icons/fa';
import { ContactType } from '..';

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: { id },
  });

  const [contact, setContact] = useState<ContactType | undefined>();

  useEffect(() => {
    setContact(data?.contact_by_pk);
  }, [data]);
  return (
    <>
      {loading ? (
        <FaSpinner />
      ) : (
        <div>
          <Image
            src={others.avatar}
            alt="Contact Name"
            width="100"
            height={'100'}
          ></Image>
          <h3>
            {contact?.first_name} {contact?.last_name}
          </h3>
        </div>
      )}
      {error ? <h3>Data {id} Not Found</h3> : null}
    </>
  );
};

export default index;

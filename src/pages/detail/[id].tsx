import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GET_DETAIL } from '../../../api/gql';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { others } from '@/styles/constants';
import { FaSpinner } from 'react-icons/fa';

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: { id },
  });

  const [contact, setContact] = useState({});
  console.log(data?.contact_by_pk, contact);

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
            alt={contact?.first_name}
            width="100"
            height={'100'}
          ></Image>
          <h3>
            {contact?.first_name} {contact?.last_name}
          </h3>
        </div>
      )}
      {error ? <h3>Data Not Found</h3> : null}
    </>
  );
};

export default index;

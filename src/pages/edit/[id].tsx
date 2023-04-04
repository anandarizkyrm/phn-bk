import React from 'react';
import { GET_DETAIL } from '../../api/gql';
import { useQuery } from '@apollo/client';

import Navigation from '@/components/organisms/Navigation';
import ContactForm from '@/components/molecules/ContactForm';
import { MakeItCentered } from '@/styles';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_DETAIL, {
    variables: {
      id: id,
    },
  });
  return (
    <Navigation title="Edit Contact">
      {loading ? (
        <MakeItCentered>
          <FaSpinner />
        </MakeItCentered>
      ) : (
        <ContactForm type="edit" contactData={data?.contact_by_pk} />
      )}
      {error ? <MakeItCentered>{error.message}</MakeItCentered> : null}
    </Navigation>
  );
};

export default index;

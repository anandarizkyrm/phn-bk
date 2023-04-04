import React from 'react';
import { GET_DETAIL } from '../../api/gql';
import { ApolloError } from '@apollo/client';
import { client } from '../_app';
import { ContactType } from '../favorites';
import Navigation from '@/components/organisms/Navigation';
import ContactForm from '@/components/molecules/ContactForm';
import { MakeItCentered } from '@/styles';

const index = ({
  data,
  error,
}: {
  data: { contact_by_pk: ContactType };
  error: ApolloError | undefined;
}) => {
  return (
    <Navigation title="Edit Contact">
      <ContactForm type="edit" contactData={data.contact_by_pk} />
      {error ? <MakeItCentered>{error.message}</MakeItCentered> : null}
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

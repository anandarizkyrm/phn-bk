import InputWithIcon from '@/components/molecules/InputWithIcon';
import { ApolloError } from '@apollo/client';
import { GET_CONTACT_LIST } from '../../api/gql';
import { FaSearch } from 'react-icons/fa';
import CardContact from '@/components/molecules/CardContact';
import { others } from '@/styles/constants';
import { useEffect, useState } from 'react';
import Navigation from '@/components/organisms/Navigation';
import { client } from './_app';
import Pagination from '@/components/molecules/Pagination';

export interface ContactType {
  first_name: string;
  last_name: string;
  phones: any[];
  id: string;
}

export default function Home({
  data,
  error,
}: {
  data: any;
  error: ApolloError | undefined;
}) {
  const [search, setSearch] = useState('');
  const [filteredContact, setFilteredContact] = useState<ContactType[]>(
    data.contact
  );

  useEffect(() => {
    if (search.length > 0) {
      setFilteredContact(
        data?.contact.filter((c: ContactType) => {
          return (
            c.first_name.toLowerCase().includes(search.toLowerCase()) ||
            c.last_name.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }

    if (search === '') {
      setFilteredContact(data.contact);
    }
  }, [search]);

  useEffect(() => {
    setFilteredContact(data.contact);
  }, [data]);
  console.log(data);
  return (
    <Navigation title="Contact">
      <div>
        <InputWithIcon
          value={search}
          setValue={setSearch}
          icon={<FaSearch className="icon" />}
          placeholder="Search . . . "
        ></InputWithIcon>
        {filteredContact.map((contact: ContactType) => (
          <CardContact
            key={contact.id}
            id={contact.id}
            name={contact.first_name + ' ' + contact.last_name}
            imageUrl={others.avatar}
            phoneNumber={contact?.phones[0]?.number}
          />
        ))}

        {filteredContact.length == 0 ? <h1>No Data</h1> : null}
        {error ? <h1>Something went wrong, please try again later</h1> : null}
        <Pagination />
      </div>
    </Navigation>
  );
}

export async function getServerSideProps(context: any) {
  const { offset } = context.query;

  try {
    const { data } = await client.query({
      query: GET_CONTACT_LIST,
      variables: {
        limit: 5,
        offset: offset ? parseInt(offset) : 0,
      },
    });

    return { props: { data } };
  } catch (error) {
    return { props: { error: error } };
  }
}

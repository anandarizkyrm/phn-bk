import InputWithIcon from '@/components/molecules/InputWithIcon';
import { useQuery } from '@apollo/client';
import { GET_CONTACT_LIST } from '../../api/gql';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import styled from '@emotion/styled';
import CardContact from '@/components/molecules/CardContact';
import { others } from '@/styles/constants';
import { useEffect, useState } from 'react';

interface ContactType {
  first_name: string;
  last_name: string;
  phones: any[];
  id: string;
}

const Container = styled.div`
  padding: 30px 20px;
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);
  const [search, setSearch] = useState('');
  const [filteredContact, setFilteredContact] = useState<ContactType[]>([]);
  console.log(data?.contact, search, filteredContact);

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

    if (search === '' && !loading) {
      setFilteredContact(data.contact);
    }
  }, [search]);

  useEffect(() => {
    if (!loading) {
      setFilteredContact(data.contact);
    }
  }, [loading]);
  return (
    <Container>
      <InputWithIcon
        value={search}
        setValue={setSearch}
        icon={<FaSearch className="icon" />}
        placeholder="Search . . . "
      ></InputWithIcon>
      {loading ? (
        <FaSpinner />
      ) : (
        filteredContact.map((contact: ContactType) => (
          <CardContact
            key={contact.id}
            id={contact.id}
            name={contact.first_name + ' ' + contact.last_name}
            imageUrl={others.avatar}
            phoneNumber={contact?.phones[0]?.number}
          />
        ))
      )}

      {!loading && filteredContact.length == 0 ? <h1>No Data</h1> : null}
    </Container>
  );
}

import InputWithIcon from '@/components/molecules/InputWithIcon';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { others } from '@/styles/constants';
import { useContext, useEffect, useState } from 'react';
import Navigation from '@/components/organisms/Navigation';
import Pagination from '@/components/molecules/Pagination';
import dynamic from 'next/dynamic';
import { MakeItCentered } from '@/styles';
import { ContactListContext } from '@/context/contacts';

const CardContact = dynamic(
  () => import('@/components/molecules/CardContact'),
  {
    ssr: false,
  }
);
export interface ContactType {
  first_name: string;
  last_name: string;
  phones: any[];
  id: string;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const { contactList, loading, error } = useContext(ContactListContext);
  const [filteredContact, setFilteredContact] =
    useState<ContactType[]>(contactList);

  useEffect(() => {
    if (search.length > 0) {
      setFilteredContact(
        contactList?.filter((c: ContactType) => {
          return (
            c.first_name.toLowerCase().includes(search.toLowerCase()) ||
            c.last_name.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }

    if (search === '') {
      setFilteredContact(contactList);
    }
  }, [search]);

  useEffect(() => {
    setFilteredContact(contactList);
  }, [contactList]);

  return (
    <Navigation title="Contact">
      <div>
        <InputWithIcon
          value={search}
          setValue={setSearch}
          icon={<FaSearch className="icon" />}
          placeholder="Search . . . "
        ></InputWithIcon>
        <div style={{ marginTop: '22px' }}>
          {loading ? (
            <MakeItCentered>
              <FaSpinner />
            </MakeItCentered>
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
        </div>

        {filteredContact?.length == 0 && !loading ? (
          <MakeItCentered>No Data</MakeItCentered>
        ) : null}
        {error && !loading ? (
          <MakeItCentered>
            Something went wrong, please try again later
          </MakeItCentered>
        ) : null}
        {contactList?.length >= 10 ? <Pagination /> : null}
      </div>
    </Navigation>
  );
}

// export async function getServerSideProps(context: any) {
//   const { offset } = context.query;

//   try {
//     const { data } = await client.query({
//       query: GET_CONTACT_LIST,
//       variables: {
//         limit: 10,
//         offset: offset ? parseInt(offset) : 0,
//         order_by: { created_at: 'desc' },
//       },
//     });

//     return { props: { data } };
//   } catch (error) {
//     return { props: { error: error } };
//   }
// }

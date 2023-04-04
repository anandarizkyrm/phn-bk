import InputWithIcon from '@/components/molecules/InputWithIcon';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { others } from '@/styles/constants';
import { useContext, useEffect, useState } from 'react';
import Navigation from '@/components/organisms/Navigation';
import dynamic from 'next/dynamic';
import { MakeItCentered } from '@/styles';
import { ContactListContext } from '@/context/contacts';

const CardContact = dynamic(
  () => import('@/components/molecules/CardContact'),
  {
    ssr: false,
  }
);
const Pagination = dynamic(() => import('@/components/molecules/Pagination'), {
  ssr: false,
});
export interface ContactType {
  first_name: string;
  last_name: string;
  phones: any[];
  id: string;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const { contactList, loading, error, favoritesContactList } =
    useContext(ContactListContext);
  const [filteredContact, setFilteredContact] =
    useState<ContactType[]>(contactList);
  const [page, setPage] = useState(1);
  const limit = 10;

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

  const sortContact = [
    ...filteredContact.filter((contact) =>
      favoritesContactList.includes(contact.id)
    ),
    ...filteredContact.filter(
      (contact) => !favoritesContactList.includes(contact.id)
    ),
  ];
  return (
    <Navigation title="Contacts">
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
            sortContact
              ?.slice((page - 1) * limit, page * limit)
              .map((contact: ContactType) => (
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
        {sortContact?.length >= 10 ? (
          <Pagination
            data={filteredContact}
            page={page}
            setPage={setPage}
            limit={limit}
          />
        ) : null}
      </div>
    </Navigation>
  );
}

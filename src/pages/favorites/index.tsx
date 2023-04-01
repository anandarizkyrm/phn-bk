import { others } from '@/styles/constants';
import { useContext, useEffect, useState } from 'react';
import Navigation from '@/components/organisms/Navigation';
import dynamic from 'next/dynamic';
import { ContactListContext } from '@/context/contacts';
import { FaSpinner } from 'react-icons/fa';
import { MakeItCentered } from '@/styles';

const CardContact = dynamic(() => import('@/components/molecules/CardContact'));
export interface ContactType {
  first_name: string;
  last_name: string;
  phones: any[];
  id: string;
}

export default function Favorites() {
  const { favoritesContactList, contactList, loading, error } =
    useContext(ContactListContext);

  const [filteredContact, setFilteredContact] =
    useState<ContactType[]>(contactList);

  useEffect(() => {
    setFilteredContact(() => {
      return contactList.filter((contact: ContactType) =>
        favoritesContactList.includes(contact.id)
      );
    });
  }, [contactList, favoritesContactList]);

  return (
    <Navigation title="Favorites Contact">
      <div>
        <div style={{ marginTop: '22px' }}>
          {!loading ? (
            filteredContact.map((contact: ContactType) => (
              <CardContact
                key={contact.id}
                id={contact.id}
                name={contact.first_name + ' ' + contact.last_name}
                imageUrl={others.avatar}
                phoneNumber={contact?.phones[0]?.number}
              />
            ))
          ) : (
            <MakeItCentered>
              <FaSpinner />
            </MakeItCentered>
          )}
        </div>

        {filteredContact.length == 0 ? (
          <MakeItCentered>No Data</MakeItCentered>
        ) : null}
        {error ? <h1>Something went wrong, please try again later</h1> : null}
      </div>
    </Navigation>
  );
}

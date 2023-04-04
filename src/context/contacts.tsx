import React, { useEffect, useState } from 'react';
import storageHelper from '@/utils/localstorage.helper';
import { useQuery } from '@apollo/client';
import { GET_CONTACT_LIST } from '../api/gql';

export const ContactListContext = React.createContext({} as any);

const ContactContextProvider = (props: any) => {
  const { data, loading, error } = useQuery(GET_CONTACT_LIST, {
    variables: {
      order_by: { created_at: 'desc' },
    },
  });

  const [contactList, setContactList] = useState([]);
  const [favoritesContactList, setFavoritesContactList] = useState<[]>(
    storageHelper.get('favoritesContactList') || []
  );
  useEffect(() => {
    if (data) {
      setContactList(data.contact);
      storageHelper.set('contactList', data.contact);
    }
  }, [data]);

  useEffect(() => {
    storageHelper.set('favoritesContactList', favoritesContactList);
  }, [favoritesContactList]);
  console.log(data);
  return (
    <ContactListContext.Provider
      value={{
        contactList,
        favoritesContactList,
        setFavoritesContactList,
        loading,
        error,
      }}
    >
      {props.children}
    </ContactListContext.Provider>
  );
};

export default ContactContextProvider;

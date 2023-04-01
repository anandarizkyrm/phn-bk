import { ContactListContext } from '@/context/contacts';
import { useContext } from 'react';
import toast from 'react-hot-toast';

function useAddOrRemoveFromFavorite() {
  const { favoritesContactList, setFavoritesContactList } =
    useContext(ContactListContext);

  function handleAddOrRemoveFavorites(id: string) {
    if (!favoritesContactList?.includes(id)) {
      setFavoritesContactList((prev: string[]) => {
        return [...prev, id];
      });

      return toast.success('Added to favorites');
      //   return storageHelper.set('favoritesContactList', favoritesContactList);
    }

    setFavoritesContactList((prev: string[]) => {
      return prev.filter((contactId) => contactId !== id);
    });
    return toast.success('Removed from favorites');
    // return storageHelper.set('favoritesContactList', favoritesContactList);
  }

  return { handleAddOrRemoveFavorites, favoritesContactList };
}

export default useAddOrRemoveFromFavorite;

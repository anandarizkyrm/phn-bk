import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { DELETE_CONTACT } from '../../api/gql';

function useDeleteContact(id: string) {
  const [deletePost, { error }] = useMutation(DELETE_CONTACT, {
    update(cache) {
      cache.modify({
        fields: {
          contact(existingContact, { readField }) {
            return existingContact.filter(
              (contactsRef: any) => id !== readField('id', contactsRef)
            );
          },
        },
      });
    },
  });

  const handleDelete = async () => {
    toast.promise(deletePost({ variables: { id: id } }), {
      loading: 'Saving...',
      success: 'Contact deleted!',
      error: error?.message || 'Error deleting contact',
    });
  };
  return { handleDelete };
}

export default useDeleteContact;

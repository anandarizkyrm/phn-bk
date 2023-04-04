import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ADD_CONTACT_WITH_PHONE,
  EDIT_CONTACT_,
  GET_CONTACT_LIST,
} from '../api/gql';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { ContactType } from '@/pages';
import { useContext } from 'react';
import { ContactListContext } from '@/context/contacts';

interface FieldContact {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
}

function useCreateAndEditContact(
  type: 'create' | 'edit',
  contactData?: ContactType
) {
  const [addContact, { error }] = useMutation(ADD_CONTACT_WITH_PHONE, {
    onCompleted: () => {
      window.location.href = '/';
    },
    refetchQueries: [{ query: GET_CONTACT_LIST }],
  });

  const [editContact, { error: editError }] = useMutation(EDIT_CONTACT_, {
    onCompleted: () => {
      window.location.href = '/';
    },
    refetchQueries: [{ query: GET_CONTACT_LIST }],
  });

  const { contactList } = useContext(ContactListContext);
  const schema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    phones: Yup.array().of(
      Yup.object().shape({
        number: Yup.string()
          .required('Phone number is required')
          .matches(
            /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/i,
            'Phone number not valid'
          ),
      })
    ),
  });

  const {
    control,
    watch,
    handleSubmit,
    register,
    formState: { errors },
    ...restFormProps
  } = useForm<FieldContact>({
    defaultValues:
      type == 'create'
        ? {
            first_name: '',
            last_name: '',
            phones: [
              {
                number: '',
              },
            ],
          }
        : {
            first_name: contactData?.first_name,
            last_name: contactData?.last_name,
          },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FieldContact) => {
    if (type === 'create') {
      const getIfNameExists = contactList.filter(
        (contact: ContactType) =>
          contact.first_name === data.first_name ||
          contact.last_name === data.last_name
      );
      if (getIfNameExists.length > 0) {
        return toast.error('Name already exists');
      }
      return toast.promise(
        addContact({
          variables: {
            first_name: data.first_name,
            last_name: data.last_name,
            phones: data.phones.map((phone: { number: string }) => {
              return { number: phone.number };
            }),
          },
        }),
        {
          loading: 'Saving...',
          success: 'Contact Saved!',
          error: editError?.message || 'Error saving',
        }
      );
    }
    const getIfNameExistsEdit = contactList.filter(
      (contact: ContactType) =>
        (contact.first_name === data.first_name &&
          contact.id !== contactData?.id) ||
        (contact.last_name === data.last_name && contact.id !== contactData?.id)
    );
    if (getIfNameExistsEdit.length > 0) {
      return toast.error('Name already exists');
    }
    return toast.promise(
      editContact({
        variables: {
          id: contactData?.id,
          _set: {
            first_name: data.first_name,
            last_name: data.last_name,
          },
        },
      }),
      {
        loading: 'Saving...',
        success: 'Contact Edited!',
        error: error?.message || 'Error edit',
      }
    );
  };

  const watchField = (field: keyof FieldContact) => watch(field);

  return {
    control,
    handleSubmit,
    watchField,
    onSubmit,
    register,
    errors,
    ...restFormProps,
  };
}

export default useCreateAndEditContact;

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_CONTACT_WITH_PHONE, GET_CONTACT_LIST } from '../../api/gql';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
// import { useRouter } from 'next/router';

// ...

interface FieldContact {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
}

function useCreateContact() {
  // const router = useRouter();
  const [addContact, { error }] = useMutation(ADD_CONTACT_WITH_PHONE, {
    onCompleted: () => {
      // i need to reload the page cause if not the state is not updated
      // need refactor
      window.location.href = '/';
    },
    refetchQueries: [{ query: GET_CONTACT_LIST }],
  });

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
    defaultValues: {
      first_name: '',
      last_name: '',
      phones: [
        {
          number: '',
        },
      ],
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FieldContact) => {
    toast.promise(
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
        error: error?.message || 'Error saving',
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

export default useCreateContact;

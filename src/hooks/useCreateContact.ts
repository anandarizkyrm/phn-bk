import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FieldContact {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
}

function useCreateContact() {
  // const schema: yup.SchemaOf<FieldContact> = yup.object().shape({
  //   email: yup
  //     .string()
  //     .required('email harus diisi')
  //     .email('harus menggunakan format email'),

  //   password: yup
  //     .string()
  //     .required('password harus diisi')
  //     .min(8, 'password minimal 8 karakter'),
  // });

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
    // loginFunction(data);
    console.log(data);
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

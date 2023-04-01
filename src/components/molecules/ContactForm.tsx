import useCreateContact from '@/hooks/useCreateContact';
import { Controller, useFieldArray } from 'react-hook-form';
import Input from '../atoms/Input';

export default function ContactForm() {
  const { control, handleSubmit, onSubmit, register, errors } =
    useCreateContact();

  const {
    fields: phoneFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'phones',
  });

  function handleRemovePhoneNumber(index: number) {
    if (phoneFields.length === 1) {
      return;
    }
    return remove(index);
  }
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="first_name"
        render={({ field }) => {
          return (
            <Input
              placeholder="First Name"
              type="text"
              {...register(field.name)}
            />
          );
        }}
      />
      {errors.first_name && <p>{errors.first_name.message}</p>}
      <Controller
        control={control}
        name="last_name"
        render={({ field }) => {
          return (
            <Input
              placeholder="Last Name"
              type="text"
              {...register(field.name)}
            />
          );
        }}
      />
      {errors.last_name && <p>{errors.last_name.message}</p>}

      {/* <Input placeholder="First Name" {...register('first_name')} />
      <Input placeholder="Last Name" {...register('last_name')} /> */}

      <label>Phone:</label>
      {phoneFields.map((field, index) => (
        <div key={field.id}>
          <Controller
            name={`phones.${index}.number`}
            render={({ field }) => {
              return (
                <Input
                  placeholder="Phone Number"
                  type="text"
                  {...register(field.name)}
                />
              );
            }}
            control={control}
          />
          {errors?.phones?.[index] && (
            <p>{errors?.phones[index]?.number?.message}</p>
          )}
          <button
            data-testid="add-phone-number-field"
            type="button"
            onClick={() => append({ number: '' })}
          >
            Add Number
          </button>
          <button
            data-testid="remove-phone-number-field"
            type="button"
            onClick={() => handleRemovePhoneNumber(index)}
          >
            Remove Phone
          </button>
        </div>
      ))}

      <button data-testid="submit-btn" type="submit">
        Add
      </button>
    </form>
  );
}

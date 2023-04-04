import useCreateAndContact from '@/hooks/useCreateAndEditContact';
import { ContactType } from '@/pages';
import { Controller, useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Button from '../atoms/Button';
import ErrorMessage from '../atoms/ErrorMessage';
import Input from '../atoms/Input';

export default function ContactForm({
  type = 'create',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contactData,
}: {
  type?: 'create' | 'edit';
  contactData?: ContactType;
}) {
  const { control, handleSubmit, onSubmit, register, errors } =
    useCreateAndContact(type, contactData);

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
      {errors.first_name && (
        <ErrorMessage message={errors.first_name.message} />
      )}
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
      {errors.last_name && <ErrorMessage message={errors.last_name.message} />}

      {/* <Input placeholder="First Name" {...register('first_name')} />
      <Input placeholder="Last Name" {...register('last_name')} /> */}

      {phoneFields.map((field, index) => (
        <div
          style={{
            display: 'flex',
            gap: '6px',
          }}
          key={field.id}
        >
          <div style={{ flexGrow: 1 }}>
            <Controller
              name={`phones.${index}.number`}
              render={({ field }) => {
                return (
                  <Input
                    data-testid="phone-number-field"
                    placeholder={`Phone Number ${index + 1}`}
                    type="text"
                    {...register(field.name)}
                  />
                );
              }}
              control={control}
            />
            {errors?.phones?.[index] && (
              <ErrorMessage message={errors?.phones[index]?.number?.message} />
            )}
          </div>
          <Button
            data-testid="add-phone-number-field"
            type="button"
            icon={<FaPlus />}
            onClick={() => append({ number: '' })}
          />
          <Button
            data-testid="remove-phone-number-field"
            type="button"
            onClick={() => handleRemovePhoneNumber(index)}
            icon={<FaTrash />}
          />
        </div>
      ))}
      <Button wFull={true} data-testid="submit-btn" type="submit" text="Save" />
    </form>
  );
}

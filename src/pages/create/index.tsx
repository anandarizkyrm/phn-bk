import ContactForm from '@/components/molecules/ContactForm';
import Navigation from '@/components/organisms/Navigation';
import React from 'react';

const index = () => {
  return (
    <Navigation title="Create Contact">
      <div>
        Create Contact
        <ContactForm />
      </div>
    </Navigation>
  );
};

export default index;

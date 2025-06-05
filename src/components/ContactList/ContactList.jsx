import { Contact } from '../Contact/Contact';
import style from './ContactList.module.css';

import { memo } from 'react';

export const ContactList = memo(({ contacts, onEdit, onDelete }) => {
  return (
    <ul className={style.container}>
      {contacts.length === 0 && <li>No contacts found.</li>}
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contact
            contact={contact}
            onEdit={() => onEdit(contact.id)}
            onDelete={() => onDelete(contact.id)}
          />
        </li>
      ))}
    </ul>
  );
});

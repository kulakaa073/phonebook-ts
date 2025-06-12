import type { Contact as ContactType } from '../../types';
import { Contact } from '../Contact/Contact';
import style from './ContactList.module.css';

import { memo } from 'react';

interface ContactListProps {
  contacts: ContactType[];
  onEdit: (contactId: string) => void;
  onDelete: (contactId: string) => void;
}

export const ContactList = memo(
  ({ contacts, onEdit, onDelete }: ContactListProps) => {
    return (
      <ul className={style.container}>
        {contacts.length === 0 && <li>No contacts found.</li>}
        {contacts.map(contact => (
          <li key={contact.id}>
            <Contact contact={contact} onEdit={onEdit} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    );
  }
);

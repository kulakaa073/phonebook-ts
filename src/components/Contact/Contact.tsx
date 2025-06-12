import style from './Contact.module.css';
import { RiContactsFill } from 'react-icons/ri';
import { FaPhoneAlt } from 'react-icons/fa';
import { memo } from 'react';
import type { Contact as ContactType } from '../../types';

interface ContactProps {
  contact: ContactType;
  onEdit: (contactId: string) => void;
  onDelete: (contactId: string) => void;
}

export const Contact = memo(({ contact, onEdit, onDelete }: ContactProps) => {
  return (
    <div className={style.container}>
      <ul>
        <li className={style.field}>
          <RiContactsFill className={style.icon} />
          {contact.name}
        </li>
        <li className={style.field}>
          <FaPhoneAlt className={style.icon} />
          {contact.number}
        </li>
      </ul>
      <div className={style.controlls}>
        <button
          onClick={() => onDelete(contact.id)}
          className={style.controllButton}
        >
          Delete
        </button>
        <button
          onClick={() => onEdit(contact.id)}
          className={style.controllButton}
        >
          Edit
        </button>
      </div>
    </div>
  );
});

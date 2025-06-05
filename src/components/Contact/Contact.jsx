import style from './Contact.module.css';
import { RiContactsFill } from 'react-icons/ri';
import { FaPhoneAlt } from 'react-icons/fa';
import { memo } from 'react';

export const Contact = memo(({ contact, onEdit, onDelete }) => {
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
        <button onClick={onDelete} className={style.controllButton}>
          Delete
        </button>
        <button onClick={onEdit} className={style.controllButton}>
          Edit
        </button>
      </div>
    </div>
  );
});

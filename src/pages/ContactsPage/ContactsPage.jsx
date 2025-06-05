import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectError,
  selectIsLoading,
  selectFilteredContacts,
  selectLastFetched,
} from '../../redux/contacts/selectors';
import {
  fetchContacts,
  deleteContact,
  addContact,
  editContact,
} from '../../redux/contacts/operations';

import { ContactForm } from '../../components/ContactForm/ContactForm';
import { SearchBox } from '../../components/SearchBox/SearchBox.jsx';
import { ContactList } from '../../components/ContactList/ContactList';
import { ContactDeleteConfirmModal } from '../../components/ContactDeleteConfirmModal/ContactDeleteConfirmModal.jsx';
import { formatPhoneNumber, normalizePhoneNumber } from '../../utils.js';
import { selectContactById } from '../../redux/contacts/selectors';
import toast, { Toaster } from 'react-hot-toast';
import style from './ContactsPage.module.css';
//import { useDebounce } from 'use-debounce';

const ModalMode = Object.freeze({
  Add: 'add',
  Edit: 'edit',
  Delete: 'delete',
  None: 'none',
});

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [modalMode, setModalMode] = useState(ModalMode.None);

  // also saves deleteding contact id
  const [contactToChange, setContactToChange] = useState(null);
  const contact = useSelector(selectContactById(contactToChange));

  const toastOptions = {
    duration: 4000,
    position: 'top-right',
  };

  const toasts = {
    delete: () => toast.success('Contact deleted successfully!', toastOptions),
    add: () => toast.success('Contact added successfully!', toastOptions),
    edit: () => toast.success('Contact edited successfully!', toastOptions),
    fail: () =>
      toast.error(
        "Sorry, we're encountered an error! Try again later!",
        toastOptions
      ),
  };

  const handleDelete = () => {
    dispatch(deleteContact(contactToChange))
      .unwrap()
      .then(() => toasts.delete())
      .catch(() => toasts.fail());
    handleCancel();
  };

  const handleDeleteModalOpen = (contactId = '') => {
    setContactToChange(contactId);
    setModalMode(ModalMode.Delete);
  };

  const handleAdd = contact => {
    dispatch(
      addContact({
        name: contact.name,
        number: formatPhoneNumber(contact.number),
      })
    )
      .unwrap()
      .then(() => toasts.add())
      .catch(() => toasts.fail());
    // one extra setContactToChange called, but its fine, this way code is more uniform
    handleCancel();
  };

  const handleEdit = contact => {
    dispatch(
      editContact({
        contactId: contact.id,
        contactUpdates: {
          name: contact.name,
          number: formatPhoneNumber(normalizePhoneNumber(contact.number)),
        },
      })
    )
      .unwrap()
      .then(() => toasts.edit())
      .catch(() => toasts.fail());
    handleCancel();
  };

  const handleAddModalOpen = () => {
    setModalMode(ModalMode.Add);
  };

  const handleEditModalOpen = contactId => {
    setContactToChange(contactId);
    setModalMode(ModalMode.Edit);
  };

  const handleCancel = () => {
    setContactToChange(null);
    setModalMode(ModalMode.None);
  };

  // to not re-fetch contacts every time, add a timestamp and fetch only once in a while
  const lastFetched = useSelector(selectLastFetched);
  useEffect(() => {
    const timeFrame = 5 * 60 * 1000; // 5 minutes
    if (!lastFetched || Date.now() - lastFetched > timeFrame) {
      dispatch(fetchContacts());
    }
  }, [dispatch, lastFetched]);

  // polling variant
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(fetchContacts());
  //   }, 5 * 60 * 1000); // every 5 minutes
  //   return () => clearInterval(interval);
  // }, [dispatch]);

  // same idea here, fetch only on getting focus, in case
  // useEffect(() => {
  //   const handleFocus = () => {
  //     dispatch(fetchContacts());
  //   };
  //   window.addEventListener('focus', handleFocus);
  //   return () => window.removeEventListener('focus', handleFocus);
  // }, [dispatch]);

  // debounced version, CHECK IF IT WORKS!!!
  // const debouncedFetchContacts = useDebounce(
  //   () => {
  //     dispatch(fetchContacts());
  //   },
  //   1000,
  //   [dispatch]
  // );
  // useEffect(() => {
  //   const handleFocus = () => {
  //     debouncedFetchContacts();
  //   };
  //   window.addEventListener('focus', handleFocus);
  //   return () => window.removeEventListener('focus', handleFocus);
  // }, [debouncedFetchContacts]);

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div className={style.container}>
      <div className={style.controlls}>
        <SearchBox />
        <button onClick={handleAddModalOpen} className={style.addButton}>
          Add contact
        </button>
      </div>
      {isLoading && !error && (
        <div>
          <p className={style.loader}>Loading...</p>
        </div>
      )}
      {error && <p className={style.error}>{error}</p>}
      <ContactList
        contacts={filteredContacts}
        onDelete={handleDeleteModalOpen}
        onEdit={handleEditModalOpen}
      />
      {modalMode === ModalMode.Delete && (
        <ContactDeleteConfirmModal
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
      {modalMode === ModalMode.Add && (
        <ContactForm onSubmit={handleAdd} onCancel={handleCancel} />
      )}
      {modalMode === ModalMode.Edit && (
        <ContactForm
          onSubmit={handleEdit}
          onCancel={handleCancel}
          contact={contact}
        />
      )}
      <Toaster
        // try to fix later, maybe
        toastOptions={{
          className: 'themedToaster',
        }}
      />
    </div>
  );
}

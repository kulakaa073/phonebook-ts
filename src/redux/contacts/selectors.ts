import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filters/selectors';
import { normalizePhoneNumber } from '../../utils';

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectLastFetched = state => state.contacts.lastFetched;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    // no filter, return all contacts
    if (!filter) return contacts;

    let filteredcontacts;

    // no contacts in store, return empty array
    if (!contacts) {
      return [];
    }

    // try to filter by name field
    const normalizedFilter = filter.toLowerCase();
    filteredcontacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    // nothing found by name, try to filter by number field
    if (filteredcontacts.length === 0) {
      const normalizedFilter = normalizePhoneNumber(filter);
      filteredcontacts = contacts.filter(contact =>
        normalizePhoneNumber(contact.number).includes(normalizedFilter)
      );
    }

    // return whatever found
    return filteredcontacts;
  }
);

export const selectContactById = contactId => state => {
  if (!contactId) return;
  const contacts = selectContacts(state);
  return contacts.find(contact => contact.id === contactId);
};

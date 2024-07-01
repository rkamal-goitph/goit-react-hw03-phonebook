import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const retrievedInitialContacts = () => {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));
  // console.log('Retrieved contacts from localStorage:', savedContacts);
  // console.log('Retrieved contacts length from localStorage:', savedContacts.length);

  if (savedContacts && savedContacts.length > 0) {
    // console.log('Using saved contacts from localStorage');
    return savedContacts;
  }
  console.log('Using default contacts');
  return [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
};

export const App = () => {
  const [contacts, setContacts] = useState(retrievedInitialContacts);
  const [filter, setFilter] = useState('');

  // console.log('contacts state value: ', contacts);

  useEffect(() => {
    // console.log('Saving contacts to localStorage:', contacts);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    // console.log('Adding new contact:', newContact);
    const duplicateContact = contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateContact) {
      // console.log('Duplicate contact found:', duplicateContact);
      alert(`${newContact.name} is already in your contacts.`);
      return;
    }

    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts, newContact];
      // console.log('Updated contacts after adding:', updatedContacts);
      return updatedContacts;
    });
  };

  const deleteContact = id => {
    // console.log('Deleting contact with id:', id);
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(contact => contact.id !== id);
      // console.log('Updated contacts after deleting:', updatedContacts);
      return updatedContacts;
    });
  };

  const filterContact = () => {
    // console.log('Filtering contacts with filter:', filter);
    const filterLowerCase = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
    // console.log('Filtered contacts:', filteredContacts);
    return filteredContacts;
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList
        filterContact={filterContact}
        deleteContact={deleteContact}
        contacts={contacts}
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';

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

// only the global states shall be transferred to the redux store
export const App = () => {
  // STEPS TO FOLLOW FOR TRANSLATING HOOKS STATES TO REDUX SELECTORS AND DISPATCHERS
  // translate the existing states using the states declared from our Redux selectors
  // rename the event handlers so that their names are not the same as the Redux actions
  // then import dispatch and apply it inside of the event handlers

  // const [contacts, setContacts] = useState(retrievedInitialContacts);
  // const [filter, setFilter] = useState('');

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  // console.log('contacts state value: ', contacts);

  useEffect(() => {
    // console.log('Saving contacts to localStorage:', contacts);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    // console.log('Adding new contact:', newContact);
    const duplicateContact = contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateContact) {
      // console.log('Duplicate contact found:', duplicateContact);
      alert(`${newContact.name} is already in your contacts.`);
      return;
    }

    // setContacts(prevContacts => {
    //   // this is where the return value from the contacts reducer is coming from
    //   const updatedContacts = [...prevContacts, newContact];
    //   // console.log('Updated contacts after adding:', updatedContacts);
    //   return updatedContacts;
    // });

    // we replaced the setter function of the useState with the dispatch action from redux
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    // console.log('Deleting contact with id:', id);
    // setContacts(prevContacts => {
    //   const updatedContacts = prevContacts.filter(contact => contact.id !== id);
    //   // console.log('Updated contacts after deleting:', updatedContacts);
    //   return updatedContacts;
    // });

    dispatch(deleteContact(id));
  };

  const handleSetFilter = newFilter => {
    // Placeholder for future Redux dispatch to update filter
    dispatch(setFilter(newFilter));
  };

  // Calculate filtered contacts directly within the App component
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // const filterContact = () => {
  //   // console.log('Filtering contacts with filter:', filter);
  //   const filterLowerCase = filter.toLowerCase();
  //   const filteredContacts = contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filterLowerCase)
  //   );
  //   // console.log('Filtered contacts:', filteredContacts);
  //   return filteredContacts;
  // };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={handleSetFilter} />
      <ContactList deleteContact={handleDeleteContact} contacts={contacts} />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return (
      contacts ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleForm = e => {
    e.preventDefault();
    const { name, number } = e.currentTarget;
    const nameArray = contacts.map(contact => contact.name.toLowerCase());
    if (!nameArray.includes(name.value.toLowerCase())) {
      setContacts(prev => {
        const arrayCont = {
          id: nanoid(),
          name: name.value,
          number: number.value,
        };
        return [...prev, arrayCont];
      });
    } else {
      alert('Такой контакт есть, придумай другой');
    }
  };
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };
  const deleteContact = id => {
    setContacts(p => {
      const newContats = p.filter(contact => contact.id !== id);
      return newContats;
    });
  };
  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleForm} />
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContat={deleteContact} />
    </div>
  );
};

export default App;

// class oldApp extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };
//   handleForm = e => {
//     e.preventDefault();
//     const { name, number } = e.currentTarget;
//     const { contacts } = this.state;
//     const nameArray = contacts.map(contact => contact.name.toLowerCase());
//     if (!nameArray.includes(name.value.toLowerCase())) {
//       let arrayCont = [];
//       arrayCont = [
//         ...contacts,
//         { id: nanoid(), name: name.value, number: number.value },
//       ];
//       return this.setState({ ...this.state, contacts: arrayCont });
//     } else {
//       alert('Такой контакт есть, придумай другой');
//     }
//   };
//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   deleteContact = id => {
//     this.setState(p => ({
//       contacts: p.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizeFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter)
//     );
//   };
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsContacts = JSON.parse(contacts);
//     if (parsContacts) {
//       this.setState({ contacts: parsContacts });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//       console.log('изменился стате');
//     }
//   }
//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <div className={css.app}>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.handleForm} />
//         <h2>Contacts</h2>
//         <p>Find contacts by name</p>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={visibleContacts}
//           onDeleteContat={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateNewContact from './CreateNewContact';
import Search from "./Search";
import { Routes, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        {
          id: 1,
          username: 'tyler',
          name: 'Tyler McGinnis',
          handle: '@tylermcginnis',
          avatarURL: '/icons/person.svg'
        },
        {
          id: 2,
          username: "karen",
          name: 'Karen Isgrigg',
          handle: '@karen_isgrigg',
          avatarURL: '/icons/person.svg'
        },
        {
          id: 3,
          username: "richard",
          name: 'Richard Kalehoff',
          handle: '@richardkalehoff',
          avatarURL: '/icons/person.svg'
        },
      ],
      filteredContacts: [],
    };
    this.setFilteredContacts = this.setFilteredContacts.bind(this);
    this.createContact = this.createContact.bind(this);
  }
  
  setFilteredContacts(filteredContacts) {
    this.setState({ filteredContacts });
  }

  createContact(contact) {
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }))
  }

  render() {
    const { contacts, filteredContacts } = this.state;
    const displayContacts = filteredContacts.length ? filteredContacts : contacts;
    return (
      <div className='list-contacts'>
        <Routes>
          <Route exact path='/' element={<>
            <Search
              contacts={contacts}
              setFilteredContacts={this.setFilteredContacts} />
            <ListContacts
                contacts={displayContacts} />
            </>}
          />        
          <Route path='/create' 
                 element={<CreateNewContact onCreateContact={this.createContact}/>}
          />
        </Routes>
      </div>
    )
  }
}

export default App;

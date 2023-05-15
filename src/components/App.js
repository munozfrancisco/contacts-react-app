import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateNewContact from './CreateNewContact';
import Search from "./Search";
import { Routes, Route } from "react-router-dom";

class App extends Component {
  state = {
    // The 'contacts' array stores a list of contact objects
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
    // The 'filteredContacts' array will store contacts filtered by search
    filteredContacts: [],
  }; 
  
  // Updates the 'filteredContacts' array based on the search query
  setFilteredContacts = (filteredContacts) => {
    this.setState({ filteredContacts });
  }

  // Adds a new contact to the 'contacts' array
  createContact = (contact) => {
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }))
  }

  // Removes a contact from the 'contacts' array
  removeContact = (contact) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))
  }

  render() {
    const { contacts, filteredContacts } = this.state;
    // Determine which contacts to display based on whether there are filtered contacts or not
    const displayContacts = filteredContacts.length ? filteredContacts : contacts;
    return (
      <div className='list-contacts'>
        <Routes>
          {/* The main page with search functionality and the list of contacts */}
          <Route exact path='/' element={<>
            <Search
              contacts={contacts}
              setFilteredContacts={this.setFilteredContacts} />
            <ListContacts
                contacts={displayContacts} 
                onDeleteContact={this.removeContact} />
          </>}
          />        
          {/* The page for creating a new contact */}
          <Route path='/create' 
                 element={<CreateNewContact onCreateContact={this.createContact}/>}
          />
        </Routes>
      </div>
    )
  }
}

export default App;

import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class Search extends Component {
  state = {
    searchTerm: "",
  };

  handleSearch = (event) => {
    const term = event.target.value;
    this.setState({ searchTerm: term });

    // Filter the contacts based on the search term
    const filteredContacts = this.props.contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(term.toLowerCase()) ||
        contact.handle.toLowerCase().includes(term.toLowerCase())
      );
    });

    // Call the setFilteredContacts function from props to update the filtered contacts
    this.props.setFilteredContacts(filteredContacts);
  }

  render() {
    return (
      <div className='list-contacts-top'>
        {/* Input field for searching contacts */}
        <input
          className="search-contacts"
          type="text"
          placeholder="Search contacts"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
        />
        
        {/* Link to navigate to the create contact page */}
        <Link
          to='/create'
          className='add-contact'>
          Add Contact
        </Link>
      </div>
    );
  }    
}

Search.propTypes = {
  contacts: PropTypes.array,
  setFilteredContacts: PropTypes.func,
}

export default Search;

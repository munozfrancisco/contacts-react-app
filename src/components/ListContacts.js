import React from 'react'
import PropTypes from 'prop-types'

const ListContacts = props => {
  // Destructure the props
  const { contacts, onDeleteContact } = props

  return (
    <ol className='contact-list'>
      {/* Map through the contacts array and render each contact */}
      {contacts.map((contact) => (
        <li key={contact.id} className='contact-list-item'>
          <div
            className='contact-avatar'
            style={{
              backgroundImage: `url(${contact.avatarURL})`
            }}
          />
          <div className='contact-details'>
            <p>{contact.name}</p>
            <p>{contact.handle}</p>
          </div>
          {/* Call onDeleteContact with the contact object when the button is clicked */}
          <button
            onClick={() => onDeleteContact(contact)}
            className='contact-remove'>
            Remove
          </button>
        </li>
      ))}
    </ol>
  )
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func,
}

export default ListContacts;

import React, { Component } from 'react';
import { NavLink, Navigate } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateNewContact extends Component {
  state = { redirect: null }

  handleSubmit = (e) => {
    e.preventDefault()
    // Serialize form data into a newContact object
    const newContact = serializeForm(e.target, { hash: true })

    if (this.props.onCreateContact) {
      // Call the onCreateContact function passed as a prop with the newContact object
      this.props.onCreateContact(newContact)
      // Set the redirect state to trigger a navigation back to the main page
      let redirect = newContact;
      this.setState({ redirect })
    }
  }

  render() {
    let { redirect } = this.state
    return (
      <div>
        {/* If redirect state is set, navigate back to the main page */}
        {redirect && (
          <Navigate to="/"/>
        )}
        <NavLink
          className='close-create-contact'
          to='/'>
          Close
        </NavLink>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          {/* Component for capturing and displaying an image */}
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            <input type='text' name='name' placeholder='Name' />
            <input type='text' name='handle' placeholder='Handle' />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateNewContact;

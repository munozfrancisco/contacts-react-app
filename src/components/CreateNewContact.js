import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateNewContact extends Component {
    state = { redirect: null}

    handleSubmit = (e) => {
        e.preventDefault()
        const newContact = serializeForm(e.target, { hash: true })

        if (this.props.onCreateContact) {
            this.props.onCreateContact(newContact)
            let redirect = newContact;
            this.setState({ redirect })
        }
    }
    render() { 
        let { redirect } = this.state
        return (
            <div>
                {redirect && (
                  <Navigate to="/" replace={true} />
                )}
                <Link 
                  className='close-create-contact'
                  to='/'>
                    Close
                </Link>
                <form onSubmit={this.handleSubmit} className='create-contact-form'>
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
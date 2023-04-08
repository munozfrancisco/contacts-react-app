import React, { Component } from 'react';
import ListContacts from './ListContacts';


class App extends Component {
  state = {
    contacts: [
      {
        id: 'tyler',
        name: 'Tyler McGinnis',
        handle: '@tylermcginnis',
        avatarURL: '/icons/person.svg'
      },
      {
        id: 'karen',
        name: 'Karen Isgrigg',
        handle: '@karen_isgrigg',
        avatarURL: '/icons/person.svg'
      },
      {
        id: 'richard',
        name: 'Richard Kalehoff',
        handle: '@richardkalehoff',
        avatarURL: '/icons/person.svg'
      },
    ]
  }
  
  render() {
    return (
      <ListContacts
      contacts={this.state.contacts}
      />

    )
  }
}

export default App;

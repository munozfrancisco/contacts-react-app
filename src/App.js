import React, { Component } from 'react'
import ListContacts from './ListContacts'


class App extends Component {
  state = {
    contacts: [
      {
        id: 'tyler',
        name: 'Tyler McGinnis',
        handle: '@tylermcginnis',
        avatarURL: ''
      },
      {
        id: 'karen',
        name: 'Karen Isgrigg',
        handle: '@karen_isgrigg',
        avatarURL: ''
      },
      {
        id: 'richard',
        name: 'Richard Kalehoff',
        handle: '@richardkalehoff',
        avatarURL: ''
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

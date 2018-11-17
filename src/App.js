import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm';
import ChatScreen from './components/ChatScreen';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({username}),
    })
    .then(res => {
      this.setState({currentUsername: username})
      this.setState({currentScreen: 'ChatScreen'})
    })
    .catch(error => console.log(error))
  }
  render() {
    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
    return (
      <div>
        <UsernameForm onSubmit={this.onUsernameSubmitted} />
      </div>
    );
    } else {
      return (
      <div>
        <ChatScreen currentUsername={this.state.currentUsername} />
      </div>
    )
    }
  }
}

export default App

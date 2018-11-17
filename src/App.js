import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUsername: '',

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
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        <UsernameForm onSubmit={this.onUsernameSubmitted} />
      </div>
  );
  }
}

export default App

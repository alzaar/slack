import React from 'react';

class UsernameForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  onChange(e) {
    this.setState({username: e.target.value})
  }
  render() {
    return (
        <div>
          <h2>What is your username?</h2>
          <form onSubmit={this.onSubmit} >
            <input type="text" placeholder="Please enter!" onChnage={this.onChange} />
            <input type="submit" />
          </form>
        </div>
    );
  }
}

export default UsernameForm;

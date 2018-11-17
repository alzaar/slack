import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm'
import WhosOnlineList from './WhosOnlineList';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }
  sendTypingEvent() {
     this.state.currentUser
       .isTypingIn({ roomId: this.state.currentRoom.id })
       .catch(error => console.error('error', error))
   }
  sendMessage(text) {
    console.log(this.state.currentUser)
     this.state.currentUser.sendMessage({
       text,
       roomId: this.state.currentRoom.id,
     })
   }
   comonentDidMount() {
       const chatManager = new Chatkit.ChatManager({
         instanceLocator: 'v1:us1:d3dd1f58-970c-4b75-b1ec-934808c88418',
         userId: this.props.currentUsername,
         tokenProvider: new Chatkit.TokenProvider({
           url: 'http://localhost:3001/authenticate',
         }),
       })

       chatManager
         .connect()
         .then(currentUser => {
           this.setState({ currentUser })
           return currentUser.subscribeToRoom({
             roomId: 19382463,
             messageLimit: 100,
             hooks: {
               newMessage: message => {
                 this.setState({
                   messages: [...this.state.messages, message],
                 })
               },
               userStartedTyping: user => {
                 this.setState({
                   usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                 })
               },
               userStoppedTyping: user => {
                 this.setState({
                   usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                     username => username !== user.name
                   ),
                 })
               },
                onPresenceChange: () => this.forceUpdate(),
                onUserJoined: () => this.forceUpdate(),
              },
           })
         })
         .then(currentRoom => {
           this.setState({ currentRoom })
         })
         .catch(error => console.error('error', error))
     }

  render() {
     const styles = {
     container: {
     height: '100vh',
     display: 'flex',
     flexDirection: 'column',
   },
   chatContainer: {
     display: 'flex',
     flex: 1,
   },
   whosOnlineListContainer: {
     width: '300px',
     flex: 'none',
     padding: 20,
     backgroundColor: '#2c303b',
     color: 'white',
   },
   chatListContainer: {
     padding: 20,
     width: '85%',
     display: 'flex',
     flexDirection: 'column',
   },
}

 return (
   <div style={styles.container}>
     <div style={styles.chatContainer}>
       <aside style={styles.whosOnlineListContainer}>
         <h2>Who's online PLACEHOLDER</h2>
       </aside>
       <section style={styles.chatListContainer}>
       <MessageList
               messages={this.state.messages}
               style={styles.chatList}
             />
       <SendMessageForm onSubmit={this.sendMessage} />
       </section>
     </div>
   </div>
     )
  }
}

export default ChatScreen;

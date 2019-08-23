import React, { Component } from 'react';

class Name extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      name: '',
      chatInput: '',
      chatLog: []
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.enterHandler);
  }

  enterHandler = (e) => {
    if (e.keyCode === 13) {
      this.checkForName();
    }
  }

  updateNameInput = (nameInput) => {
    this.setState({ nameInput });
  }

  updateName = (name) => {
    this.setState({ name: this.state.nameInput })
  }

  resetName = () => {
    this.setState({ name: '' });
  }

  updateChatInput = (chatInput) => {
    this.setState({chatInput});
  }

  checkForName = () => {
    this.state.name && this.state.chatInput ? this.updateChatLog() : alert('please enter a name and/or message');
  }

  updateChatLog = () => {
    const chatObj = {'chat': this.state.chatInput, 'name': this.state.name};
    console.log(chatObj);
    this.setState({chatLog: [...this.state.chatLog, chatObj]});
    this.setState({chatInput: ''});
  }

  render() {
    const chatList = this.state.chatLog.map((entry, i) => {
      return (
        <div key={i}>
          <p>{entry.name}: {entry.chat}</p>
        </div>
      )
    })
    return (
      <div>
        <div>
          {this.state.name ?
            <div>
              <p>You're currently named {this.state.name}</p>
              <button onClick={() => this.resetName()}>Reset your name</button>
            </div>
            :
            <div>
              <input type='text' onChange={(e) => this.updateNameInput(e.target.value)} value={this.state.nameInput} placeholder='type your name'></input>
              <button onClick={() => this.updateName(this.state.name)}>Set your name!</button>
            </div>
          }
        </div>
        <div>
          <input onChange={(e) => this.updateChatInput(e.target.value)} value={this.state.chatInput} placeholder='message goes here'></input>
          <button onClick={() => this.checkForName()}>Post chat!</button>
        </div>
        <div>
          {chatList}
        </div>
      </div>
    )
  }
}

export default Name;
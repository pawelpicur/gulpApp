import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Anchor from 'grommet/components/Anchor';
import { firebaseApp } from '../firebase';
import LoginForm from 'grommet/components/LoginForm';
import App from 'grommet/components/App';
import Button from 'grommet/components/Button';
import Notification from 'grommet/components/Notification';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Paragraph from 'grommet/components/Paragraph';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      activIndex: 0,
      error: {
          message: ""
      }
    }
  }

signIn(username, password) {
    this.setState({email: username});
    this.setState({password});
    console.log('this.state', this.state);
    
    firebaseApp.auth().signInWithEmailAndPassword(username, password)
    .catch(error => {
        console.log('error', error);
        this.setState({error})
    })
}


signUp(username, password) {
    this.setState({email: username});
    this.setState({password});
    console.log('this.state', this.state);

    firebaseApp.auth().createUserWithEmailAndPassword(username, password)
    .catch(error => {
        console.log('error', error);
        this.setState({error})
    })
}

componentDidMount(){
  console.log('tab-1', document.getElementById('tab-1'))
    console.log('tab1', document.getElementsByClassName('tab1'))

   //document.getElementsByClassName('grommetux-button grommetux-button--primary')[0].innerText = 'test';
}

  render() {
      console.log('props singin', this.props)
      const styBox = { padding: '0 0.5em 0 0.5em' };
  return (
    <App centered={false} style={{maxWidth: '600px'}}>
      <Tabs justify='center' activeIndex={this.state.activIndex} onActive={() => this.setState({email: '', password: '',error: {message: "" }})}>
        <Tab title='Login' onClick={() => this.setState({activIndex:0})}>
          <Paragraph style={{paddingLeft: "2%", marginBottom: '0px'}}>
            Fill in the fields and click the button to Login
          </Paragraph>
            <LoginForm rememberMe={true} style={styBox} align="start" onSubmit={({username, password}) => this.signIn(username, password)} forgotPassword={this.state.error.message ? <Notification message={this.state.error.message} status="critical"/> : null} />
            <div style={{paddingLeft: "2%"}}><Anchor onClick={() => this.setState({activIndex: 1, email: '', password: '',error: {message: "" }})} label='New User? Try signing up' /></div>
        </Tab>
        <Tab className='tab1' title='Register' onClick={() => this.setState({activIndex:1})}>
          <Paragraph style={{paddingLeft: "2%", marginBottom: '0px'}}>
            Fill in the fields and click the button to Register
          </Paragraph>
            <LoginForm className='register-form' style={styBox} align="start" onSubmit={({username, password}) => this.signUp(username, password)} forgotPassword={this.state.error.message ? <Notification message={this.state.error.message} status="critical"/> : null} />
            <div style={{paddingLeft: "2%"}}><Anchor onClick={() => this.setState({activIndex: 0, email: '', password: '',error: {message: "" }})} label='Already Registered? Sign In' /></div>
            <div style={{paddingLeft: "2%"}}><Anchor onClick={() => console.log('test', document.getElementsByClassName('grommetux-button grommetux-button--primary')[0].innerText)} label='test' /></div>
        </Tab>
      </Tabs>
    </App>
    
    )
  }
}


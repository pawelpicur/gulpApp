import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Anchor from 'grommet/components/Anchor';
import { firebaseApp } from '../firebase';
import App from 'grommet/components/App';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import FormField from 'grommet/components/FormField';
import PasswordInput from 'grommet/components/PasswordInput';
import TextInput from 'grommet/components/TextInput';
import Form from 'grommet/components/Form';
import Button from 'grommet/components/Button';
import UserAddIcon from 'grommet/components/icons/base/UserAdd';
import GroupIcon from 'grommet/components/icons/base/Group';

export default class SignForm extends Component {
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

signIn() {
    console.log('this.state', this.state);
    let { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
        console.log('error', error);
        this.setState({error})
    })
}


signUp() {
    console.log('this.state', this.state);
    let { email, password } = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
        console.log('error', error);
        this.setState({error})
    })
}

componentDidMount() {
  this.clickLoginTab();
}

clickRegisterTab(){
  ReactDOM.findDOMNode(this.refs.SU_TI).focus();
}

clickLoginTab(){
  ReactDOM.findDOMNode(this.refs.SI_TI).focus();
}

componentDidUpdate(){
  this.state.activIndex === 0 && this.state.email === '' && this.state.password === '' ? this.clickLoginTab() : null;
  this.state.activIndex === 1 && this.state.email === '' && this.state.password === '' ? this.clickRegisterTab() : null;
}

handleKeyPress(event) {
  if(event.key == 'Enter'){
    console.log('enter pressed!')
    this.state.activIndex ? this.signUp() : this.signIn();
  }
}

  render() {
      const styBox = { padding: '24px' };
      const styError = { color: 'red', marginTop: '1em', minHeight: '24px'};
      const styPara = { marginBottom: '1em', marginTop: '0'};
      const styAnchor = { paddingTop: '1em' };
  return (
    <App centered={false} style={{maxWidth: '500px'}}>
      <Tabs justify='center' activeIndex={this.state.activIndex} onActive={() => this.setState({email: '', password: '',error: {message: "" }})}>
        <Tab title='Log In' onClick={() => this.setState({activIndex:0})}>
          <Box style={styBox}>
            <Paragraph style={styPara}>
              Fill in the fields and click the button to Log In
            </Paragraph>
              <Form style={{width: '100%'}} onKeyPress={event => this.handleKeyPress(event)}>
                <FormField label='E-mail'>
                  <TextInput ref='SI_TI' style={{border:'none'}} value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                </FormField>
                <FormField label='Password'>
                  <PasswordInput ref='SI_PI' style={{border:'none'}} value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                </FormField>      
              </Form>
              <div style={styError}><strong>{this.state.error.message}</strong></div>
              <Button fill={true} primary={true} type="submit" label='Log In' onClick={() => this.signIn()}/>
              <div style={styAnchor}><Anchor icon={<UserAddIcon/>} onClick={() => this.setState({activIndex: 1, email: '', password: '',error: {message: "" }})} label='New User? Try signing up' /></div> 
          </Box>
         </Tab>
        <Tab title='Register' onClick={() => this.setState({activIndex:1})}>
          <Box style={styBox}>
            <Paragraph style={styPara}>
              Remember to activate your account after registering
            </Paragraph>
              <Form style={{width: '100%'}} onKeyPress={event => this.handleKeyPress(event)}>
                <FormField label='E-mail'>
                  <TextInput ref='SU_TI' style={{border:'none'}} value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                </FormField>
                <FormField label='Password'>
                  <PasswordInput ref='SU_PI' style={{border:'none'}} value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                </FormField>      
              </Form>
              <div style={styError}><strong>{this.state.error.message}</strong></div>
              <Button fill={true} primary={true} type="submit" label='Create Account' onClick={() => this.signUp()}/>            
              <div style={styAnchor}><Anchor icon={<GroupIcon/>} onClick={() => this.setState({activIndex: 0, email: '', password: '',error: {message: "" }})} label='Already Registered? Sign In' /></div>
          </Box>
        </Tab>
      </Tabs>
    </App>
    
    )
  }
}


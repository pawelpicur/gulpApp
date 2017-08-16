import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../firebase';
import LoginForm from 'grommet/components/LoginForm';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

// signIn() {
//     console.log('this.state', this.state);
//     let { email, password } = this.state;
//     firebaseApp.auth().signInWithEmailAndPassword(email, password)
//     .catch(error => {
//         console.log('error', error);
//         this.setState({error})
//     })
// }
  render() {
      console.log('props singin', this.props)

  return (
        <div >
            <LoginForm align="start" onSubmit={({username, password}) => this.signIn(username, password)} title='SignIn' /> 

          {/* <h2>SignIn</h2>
          <div className="form-group">
              <input className="form-control" style={{marginRight: "5%", maxWidth: "25em"}}
              type="text"
              placeholder="e-mail"
              onChange={(e) => this.setState({email: e.target.value})}
              />
              <input className="form-control" style={{marginRight: "5%", maxWidth: "25em"}}
              type="password"
              placeholder="password"
              onChange={(e) => this.setState({password: e.target.value})}
              />
              <button className="btn btn-primary" style={{marginTop:"1em"}}
              type="button"
              onClick={() => this.signIn()}>Sign In</button>
          </div>  */}
          <div style={{color: "red", marginTop: "1em"}}><strong>{this.state.error.message}</strong></div>
          <div><Link to={'/SignUp'}>New User? Try signing up</Link></div>
      </div>
    )
  }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../firebase';

export default class SignUp extends Component {
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

signUp() {
    console.log('this.state', this.state);
    let { email, password } = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
        console.log('error', error);
        this.setState({error})
    })
}

  render() {
  return (
      <div className="form-inline" style={{margin:"5%"}}>
          <h2>SignUp</h2>
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
              onClick={() => this.signUp()}>Sign Up</button>
          </div>
          <div style={{color: "red", marginTop: "1em"}}><strong>{this.state.error.message}</strong></div>
          <div><Link to={'/SignIn'}>Registered already? Sign In instead</Link></div>
      </div>
    )
  }
}
import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';
import Anchor from 'grommet/components/Anchor';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  signOut() {
    firebaseApp.auth().signOut();
  }

  render() {
  return (
      <div>
          <h3>Goals</h3>
          <div>Add Goal</div>
          <div>Goal List</div>
          <Anchor label="Reminder" path={'/Reminder'}/>
          <button className="btn btn-danger" onClick={() => this.signOut()}>Sign Out</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {}
}

export default connect(mapStateToProps, null)(Index)
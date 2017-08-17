import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions/reminders';
import moment from 'moment';
import Anchor from 'grommet/components/Anchor';

class Reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

addReminder() {
  console.log('this', this);
  this.props.addReminder(this.state.text, this.state.dueDate);
}

deleteReminder(id) {
  console.log('deleting in app', id);
  console.log('this.props', this.props);
  this.props.deleteReminder(id);
}

renderReminders() {
    console.log('this.props przed map', this.props)
  const { reminders } = this.props;
  return (
    <ul className="list-group col-sm-4">
      {
        reminders.map(reminder => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div><em>{moment (new Date(reminder.dueDate)).fromNow()}</em></div>
              </div>
              
              <div className="list-item delete-button"  onClick={() => this.deleteReminder(reminder.id)}><strong>&#x2715;</strong></div>

            </li>
          )
        })
      }
    </ul>
  )
}

render() {
  return (
    <div className="Application">
      <div className="Title">
          Reminders
      </div>
      <div className="form-inline reminder-form">
        <div className="form-group">
          <input className="form-control" placeholder="To do..." onChange={event => this.setState({text: event.target.value})}/>
          <input className="form-control" type="datetime-local" onChange={event => this.setState({dueDate: event.target.value})}/>
  
        </div>
          <button type="button" className="btn btn-success" onClick={() => this.addReminder()} >Add Reminder</button>
      </div>
      <br/>
        { this.renderReminders()}
        <div className="btn btn-danger"
    onClick={() => this.props.clearReminders()}>Clear Reminders</div>

    <div><Anchor label="Home" path={'/Home'}/></div>
    </div>
    
  )
}
}
function mapStateToProps(state) {
  return {
    reminders: state
  }
}
export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(Reminder);
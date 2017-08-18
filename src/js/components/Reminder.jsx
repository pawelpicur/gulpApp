import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions/reminders';
import moment from 'moment';
import Anchor from 'grommet/components/Anchor';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import { bake_cookie, read_cookie } from 'sfcookies';

class Reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: '',
      language: {
        label: read_cookie('LanguageReminders').label,
        value: read_cookie('LanguageReminders').value
      }
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
          //console.log('reminder', reminders[reminders.length-1].language.label)
          
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                
                <div><em>{moment (new Date(moment (reminder.dueDate, "DD/MM/YYYY HH:mm").format("MM/DD/YYYY h:mm a"))).locale(this.state.language.value).fromNow() }</em></div>
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
          <Form>

            <FormField label="Reminder">
              <TextInput ref='reminder_input' placeholder="To do..." style={{border:'none'}} value={this.state.text} onChange={event => this.setState({text: event.target.value})} />
            </FormField>

            <FormField label="Date">
              <DateTime id='datetime'
                format="DD/MM/YYYY HH:mm"
                name='Date'
                value={this.state.dueDate}
                onChange={event => this.setState({dueDate: event})} />
            </FormField>
            
          </Form>
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
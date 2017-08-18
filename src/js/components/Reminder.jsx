import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions/reminders';
import moment from 'moment';
import Anchor from 'grommet/components/Anchor';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import { bake_cookie, read_cookie } from 'sfcookies';
import App from 'grommet/components/App';

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
  const styButton = { maxWidth: '480px', marginTop: '1em'};
  return (
    <App style={{maxWidth: '500px', padding: '24px'}}>
      
          <Form>

            <FormField label="Reminder">
              <TextInput ref='reminder_input' placeHolder="To do..." style={{border:'none'}} value={this.state.text} onChange={event => this.setState({text: event.target.value})} />
            </FormField>

            <FormField label="Date">
              <DateTime id='datetime'
                format="DD/MM/YYYY HH:mm"
                name='Date'
                value={this.state.dueDate}
                onChange={event => this.setState({dueDate: event})} />
            </FormField>
            
          </Form>

        <Button fill={true} style={styButton} primary={true} type="submit" label='Add Reminder' onClick={() => this.addReminder()}/>

      <Box style={{paddingTop:'2em'}} pad='small'>
      { this.renderReminders()}
      </Box>
        

    <Button fill={true} style={styButton} primary={false} critical={true} label='Clear Reminders' onClick={() => this.props.clearReminders()}/>
    <div style={{paddingTop:'2em'}}>
      <Button style={styButton} primary={true} label='Back' path={'/Home'}/>
    </div>
    </App>
  )
}
}
function mapStateToProps(state) {
  return {
    reminders: state
  }
}
export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(Reminder);
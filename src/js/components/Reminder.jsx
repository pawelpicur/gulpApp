import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders, sortReminders } from '../actions/reminders';
import moment from 'moment';
import Anchor from 'grommet/components/Anchor';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
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

sortReminders(text) {
  console.log('this', this);
  console.log('sortIndex', text);
  this.props.sortReminders(text);
}

renderReminders() {
    console.log('this.props przed map', this.props)
  const { reminders } = this.props;
  
  return (
    <Table>
    <TableHeader labels={['Reminder', 'Time Left', 'Delete']}
      sortIndex={0}
      sortAscending={false}
      //onSort={this.sortReminders(0)}
/>
      <tbody>
      {
        reminders.map(reminder => {
          //console.log('reminder', reminders[reminders.length-1].language.label)
          
          return (
            <TableRow key={reminder.id}>
                <td style={{width: '65%'}}>{reminder.text ? reminder.text : 'Missing Reminder Name'}</td>
                <td style={{width: '33%'}}>{reminder.dueDate ? moment (new Date(moment (reminder.dueDate, "DD/MM/YYYY HH:mm").format("MM/DD/YYYY h:mm a"))).locale(this.state.language.value).fromNow() : 'Missing Reminder Date'}</td>
                <td style={{width: '2%'}}><div className="list-item delete-button"  onClick={() => this.deleteReminder(reminder.id)}><strong>&#x2715;</strong></div></td>
            </TableRow>
          )
        })
      }
      
      </tbody>
    </Table>
    
  )
}

render() {
  const styButton = { maxWidth: '480px', marginTop: '1em'};
  return (
    <App style={{ padding: '24px'}}>
      
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

      <Box style={{paddingTop:'2em'}}>
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
export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders, sortReminders})(Reminder);
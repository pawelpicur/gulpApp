import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders, sortReminders, sortRemindersDESC } from '../actions/reminders';
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
import AddIcon from 'grommet/components/icons/base/Add';
import FormCloseIcon from 'grommet/components/icons/base/FormClose';
import ClearIcon from 'grommet/components/icons/base/Clear';
import HomeIcon from 'grommet/components/icons/base/Home';

class Reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: '',
      sortASC: read_cookie('ASCDESC'),
      language: {
        label: read_cookie('LanguageReminders').label,
        value: read_cookie('LanguageReminders').value
      }
    }
  }

componentWillMount(){
  this.state.sortASC ? this.sortReminders() : this.sortRemindersDESC();
}

addReminder() {
  console.log('this', this);
  this.props.addReminder(this.state.text, this.state.dueDate);
  this.state.sortASC ? this.sortRemindersDESC() : this.sortReminders();
}

sortReminders() {
  this.props.sortReminders();
  this.setState({sortASC: false})
}

sortRemindersDESC() {
  this.props.sortRemindersDESC();
  this.setState({sortASC: true})
}

deleteReminder(id) {
  console.log('deleting in app', id);
  console.log('this.props', this.props);
  this.props.deleteReminder(id);
}

handleKeyPress(event) {
  if(event.key == 'Enter'){
    console.log('enter pressed!')
    this.addReminder();
  }
}

clickSort() { 
  this.state.sortASC ? this.sortReminders() : this.sortRemindersDESC() 
  let ascCookie = this.state.sortASC;
  bake_cookie('ASCDESC', ascCookie)
}

renderReminders() {
  console.log('this.props przed map', this.props)
  const { reminders } = this.props;
  
  return (
    <Table>
   <TableHeader labels={['Reminder', 'Time Left', 'Delete']}
    sortIndex={1}
    sortAscending={read_cookie('ASCDESC')}
    onClick={()=> this.clickSort()}
    className='tableSorter'
/>
      <tbody>
      {
        reminders.map(reminder => {
          //console.log('reminder', reminders[reminders.length-1].language.label)
          
          return (
            <TableRow key={reminder.id}>
                <td style={{width: '65%'}}>{reminder.text ? reminder.text : 'Missing Reminder Name'}</td>
                <td style={{width: '30%'}}>{reminder.dueDate ? moment (new Date(moment (reminder.dueDate, "DD/MM/YYYY HH:mm").format("MM/DD/YYYY h:mm a"))).locale(this.state.language.value).fromNow() : 'Missing Reminder Date'}</td>
                <td style={{width: '5%', textAlign:'center'}} className='delete-button' onClick={() => this.deleteReminder(reminder.id)}><FormCloseIcon colorIndex='critical'/></td>
            </TableRow>
          )
        })
      }
      
      </tbody>
    </Table>
    
  )
}

render() {
  const styButton = { maxWidth: '480px', marginTop: '1em' };
  return (
    <App style={{ padding: '24px' }}>
      <Box pad='none' align='center'>
          <Form onKeyPress={event => this.handleKeyPress(event)}>

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
      <Button fill={true} icon={<AddIcon colorIndex='brand'/>} style={styButton} primary={true} type='submit' label='Add Reminder' onClick={() => this.addReminder()}/>

      <Box style={{paddingTop:'2em'}}>
      { this.renderReminders()}
      </Box>
        

    <Button fill={true} icon={<ClearIcon colorIndex='critical'/>} style={styButton} primary={false} critical={true} label='Clear Reminders' onClick={() => this.props.clearReminders()}/>
    </Box> 
    <div style={{paddingTop:'2em'}}>
      <Button style={styButton} primary={true} label='Back' path={'/Home'}/>
    </div>     
    <div style={{paddingTop:'2em'}}>
      <Button style={styButton} primary={true} label='Sort' onClick={()=> this.clickSort() }/>
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
export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders, sortReminders, sortRemindersDESC})(Reminder);
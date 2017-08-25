import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      wrongDateFormatMsg: 'Wrong Date Format',
      wrongDateFormatTitle: 'Click to see the value for 5 seconds',
      missingReminderName: 'Missing Reminder Name',
      missingReminderDate: 'Missing Reminder Date',
      headerTitle: 'Click on the arrow to change sorting direction',
      deleteReminderTitle: 'Click to delete the reminder',
      toDoPlaceholder: 'To do...',
      dateLabel: 'Date',
      dateInputTitle: 'Type the date in the field or Pick it using the icon on the right',
      addReminder: 'Add Reminder',
      addReminderTitle: 'Click to add reminder',
      clearRemindersButtonTitle: 'WARNING! Clearing reminders is irreversible',
      clearRemindersMsg: 'Clear Reminders',
      backButtonMsg: 'Back',
      label: {
        reminder: 'Reminder',
        timeLeft: 'Time Left',
        delete: 'Delete'
      },
      text: '',
      dueDate: '',
      sortASC: read_cookie('ASCDESC') !== [] ? read_cookie('ASCDESC') : true,
      language: {
        label: read_cookie('LanguageReminders').label ? read_cookie('LanguageReminders').label : 'English',
        value: read_cookie('LanguageReminders').value ? read_cookie('LanguageReminders').value : 'en'
      }
    }
  }

componentWillMount(){
  this.state.sortASC ? this.sortReminders() : this.sortRemindersDESC();
}

addReminder() {
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
  bake_cookie('ASCDESC', this.state.sortASC)
}

renderReminders() {
  const { reminders } = this.props;
  return (
  <Table>
   <TableHeader title={this.state.headerTitle} labels={[this.state.label.reminder, this.state.label.timeLeft, this.state.label.delete]}
    sortIndex={1}
    sortAscending={this.state.sortASC}
    onClick={()=> this.clickSort()}
    className='tableSorter'/>
      <tbody>
      {
        reminders.map(reminder => {        
          return (
            <TableRow key={reminder.id}>
                <td style={{width: '75%'}}>{reminder.text ? reminder.text : this.state.missingReminderName}</td>
                <td style={{width: '22%'}}>{(reminder.dueDate.length !== 16 && reminder.dueDate.length > 0) ? 
                  <div title={this.state.wrongDateFormatTitle} className='wrongdateformat' style={{color:"red"}} id={reminder.id} 
                  onClick={()=> { 
                                  let oldmsg = this.state.wrongDateFormatMsg
                                  document.getElementById(reminder.id).textContent = reminder.dueDate; 
                                  setTimeout(function(){document.getElementById(reminder.id).textContent = oldmsg},5000)
                                }
                          }>{this.state.wrongDateFormatMsg}</div> : (reminder.dueDate ? 
                            moment (new Date(moment (reminder.dueDate, "DD/MM/YYYY HH:mm").format("MM/DD/YYYY h:mm a"))).locale(this.state.language.value).fromNow() : this.state.missingReminderDate)}
                </td>
                <td title={this.state.deleteReminderTitle} style={{width: '3%', textAlign:'center'}} className='delete-button' onClick={() => this.deleteReminder(reminder.id)}><FormCloseIcon colorIndex='critical'/></td>
            </TableRow>
          )
        })
      }
      
      </tbody>
  </Table>
    
  )
}

render() {
  const styButton = { marginTop: '1em' };
  return (
    <App style={{ padding: '24px'}}>
      <Box pad='none' align='center'>
          <Form style={{width: '100%'}} onKeyPress={event => this.handleKeyPress(event)}>

            <FormField label={this.state.label.reminder}>
              <TextInput ref='reminder_input' placeHolder={this.state.toDoPlaceholder} style={{border:'none'}} value={this.state.text} onChange={event => this.setState({text: event.target.value})} />
            </FormField>

            <FormField label={this.state.dateLabel} style={{width: '80%'}}>
              <DateTime id='datedrop'
                format="DD/MM/YYYY HH:mm"
                title={this.state.dateInputTitle}
                name={this.state.dateLabel}
                value={this.state.dueDate}
                onChange={event => this.setState({dueDate: event})} />
            </FormField>
            
          </Form>
      <Button fill={true} icon={<AddIcon colorIndex='brand'/>} title={this.state.addReminderTitle} style={styButton} primary={true} type='submit' label={this.state.addReminder} onClick={() => this.addReminder()}/>

      <Box style={{paddingTop:'2em'}}>
      { this.renderReminders()}
      </Box>
        

    <Button title={this.state.clearRemindersButtonTitle} fill={true} icon={<ClearIcon colorIndex='critical'/>} style={styButton} primary={false} critical={true} label={this.state.clearRemindersMsg} onClick={() => this.props.clearReminders()}/>
    </Box> 
    <div style={{paddingTop:'2em'}}>
      <Button style={styButton} primary={true} label={this.state.backButtonMsg} path={'/Home'}/>
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
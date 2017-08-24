import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';
import Form from 'grommet/components/Form';
import Select from 'grommet/components/Select';
import FormField from 'grommet/components/FormField';
import { bake_cookie, read_cookie } from 'sfcookies';
import AddGoal from './AddGoal'
import GoalList from './GoalList'
import App from 'grommet/components/App';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      language: {
        label: read_cookie('LanguageReminders').label,
        value: read_cookie('LanguageReminders').value
      }
    }
  }

  signOut() {
    firebaseApp.auth().signOut();
  }

  selectLanguage(event){
    const lang = event.option
    bake_cookie('LanguageReminders', lang)
    this.setState({language:lang})
  }

  render() {
    const styButton = { marginTop: '1em' };
  return (
      <App style={{ padding: '24px'}}>
          <Form style={{width: '100%'}}>
            <FormField label="Language">
              <Select placeHolder='Language'
                options={[{value:'en', label:'English'}, {value:'pl', label:'Polish'}, {value:'fr', label:'French'}, {value:'es', label:'Spanish'}]}
                value={this.state.language.label}
                onChange={event => this.selectLanguage(event)} />
            </FormField>
          </Form>
          
          <h3>Goals</h3>
          <AddGoal/>
          <h3>Goal List</h3>
          <GoalList/> 
          <Box>
            <Button style={styButton} primary={true} label='Reminders' path={'/Reminder'}/>
          </Box>
          <Box>
            <Button style={styButton} primary={false} critical={true} label='Sign Out' onClick={() => this.signOut()}/>
          </Box>
      </App>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {}
}

export default connect(mapStateToProps, null)(Index)
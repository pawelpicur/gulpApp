import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';
import Anchor from 'grommet/components/Anchor';
import Form from 'grommet/components/Form';
import Select from 'grommet/components/Select';
import FormField from 'grommet/components/FormField';
import { bake_cookie, read_cookie } from 'sfcookies';
import AddGoal from './AddGoal'
import GoalList from './GoalList'
import App from 'grommet/components/App';
import Button from 'grommet/components/Button';

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
          {/* <AddGoal />
          <GoalList /> */}
          <Anchor label="Reminder" path={'/Reminder'}/>
          <Button primary={true} label='Sign Out' onClick={() => this.signOut()}/>
      </App>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {}
}

export default connect(mapStateToProps, null)(Index)
import '../scss/index.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider} from 'react-redux';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import { firebaseApp } from './firebase';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';
import reminders from './reducers/reminders';
import { logUser } from './actions';

import Index from './components/Index';
import SignForm from './components/SignForm';
import Reminder from './components/Reminder';

const store = createStore(reducer);
const storereminders = createStore(reminders);

const history = createHistory();
 firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
          console.log('user has signed in or up', user);
          const { email } = user;
          store.dispatch(logUser(email))
          history.push('/Index');
      } 
      else { 
          console.log('user has signed out or still needs sign in');
          history.replace('/SignForm');
      }
  })

class Main extends Component {

render() {

    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" />
                    <Route exact path="/Index" component={Index} /> 
                    <Route exact path="/SignForm" component={SignForm} />
                    <Provider store={storereminders}>
                        <Route exact path="/Reminder" component={Reminder} /> 
                    </Provider>
                </Switch>
            </Router>
        </Provider>
    
    );
}
  
};

let element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);

document.body.classList.remove('loading');

export default withRouter(history);

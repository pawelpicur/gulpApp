import { combineReducers } from 'redux';
import user from './user';
import goals from './goals';
import reminders from './reminders';

export default combineReducers({
    user, 
    goals, 
    reminders
})
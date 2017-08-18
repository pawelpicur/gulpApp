import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';

//Reminder


export const addReminder = (text, dueDate, language) => {
    const action = {
        type: ADD_REMINDER,
        text: text,
        dueDate, 
        language: {
            value: language.value,
            label: language.label
        }
    }
    console.log('action in addReminder', action);
    return action;
}

export const deleteReminder = (id) => {
    const action = {
        type: DELETE_REMINDER,
        id
    }
    console.log('deleting in actions', action);
    return action;
}

export const clearReminders = () => {
    const action = {
        type: CLEAR_REMINDERS
    }
    console.log('cleaning in actions', action);
    return action;
}
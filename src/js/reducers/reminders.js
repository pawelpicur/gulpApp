import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS, SORT_REMINDERS, SORT_REMINDERS_DESC } from  '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const compare = (a, b) => {
// Use toUpperCase() to ignore character casing
  const sortCompA = a.dueDate.toUpperCase();
  const sortCompB = b.dueDate.toUpperCase();

  let comparison = 0;
  if (sortCompA > sortCompB) {
    comparison = 1;
  } else if (sortCompA < sortCompB) {
    comparison = -1;
  }
  return comparison;
};

const compareDESC = (a, b) => {
// Use toUpperCase() to ignore character casing
  const sortCompA = a.dueDate.toUpperCase();
  const sortCompB = b.dueDate.toUpperCase();

  let comparison = 0;
  if (sortCompA < sortCompB) {
    comparison = 1;
  } else if (sortCompA > sortCompB) {
    comparison = -1;
  }
  return comparison;
};

const reminder = (action) => {
  let {text, dueDate } = action;
  return {
    id: Math.random(),
    text,
    dueDate
  };
};

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  console.log('new reduced reminders', reminders);
  return reminders;
};

const reminders = (state = [], action) => {
  let reminders = null;
  state = read_cookie('reminders');
  switch(action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      bake_cookie('reminders', reminders);
      console.log('reminders po add', reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      bake_cookie('reminders', reminders);
      return reminders;
    case CLEAR_REMINDERS:
      reminders = [];
      bake_cookie('reminders', reminders);
      return reminders;
    case SORT_REMINDERS:
      reminders = state.sort(compare);
      bake_cookie('reminders', reminders);
      return reminders;
    case SORT_REMINDERS_DESC:
      reminders = state.sort(compareDESC);
      bake_cookie('reminders', reminders);
      return reminders;
    default:
      return state;
  }
};

export default reminders;

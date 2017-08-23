import { SET_GOALS } from '../constants';

export default (state = [], action) => { //2parameters, state parameter set to initial empty array, cuz our goals will allways be array as we are making them in firebase listener in goallist.jsx
    switch(action.type) {
        case SET_GOALS:
            const { goals } = action //grab goals from the action
            return goals; //
        default: 
            return state;
    }
}
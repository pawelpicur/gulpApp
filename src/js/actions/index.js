import { SIGNED_IN } from '../constants';

//gulpApp

export function logUser(email) {
    const action = {
        type: SIGNED_IN,
        email
    }
    return action;
}


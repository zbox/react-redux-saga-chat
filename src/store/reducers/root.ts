import * as types from '../actions/types';
import { Interfaces as ActionInterfaces } from '../actions/root';
import { StoreState } from '../../types/state';

const initialState: StoreState = {
    login: '',
    messages: [],
    users: [],
};

const rootReducer = (state = initialState, action: ActionInterfaces): StoreState => {
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, state, { login: action.name });
        case types.ADD_MESSAGE:
        case types.MESSAGE_RECEIVED:
            return Object.assign({}, state, {
                messages: [
                    ...state.messages,
                    {
                        message: action.message,
                        user: action.user,
                        id: action.id,
                        time: action.time,
                    },
                ],
            });
        case types.ADD_USER:
            return Object.assign({}, state, { users: [...state.users, { name: action.name }] });
        case types.USERS_LIST:
            return Object.assign({}, state, { users: action.users });
        default:
            return state;
    }
};

export default rootReducer;

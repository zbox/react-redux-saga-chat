import { addMessage, addUser } from './root';
import MockDate from 'mockdate';
import * as types from '../actions/types';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testid');

MockDate.set('2021-01-01');
it('creates a message successfully', () => {
    const user = 'user1';
    const message = 'message payload';
    const action = {
        type: types.ADD_MESSAGE,
        id: 'testid',
        user: 'user1',
        time: '0:00',
        message: 'message payload',
    };
    expect(addMessage(message, user)).toEqual(action);
});

it('creates a user successfully', () => {
    const user = 'user1';
    const action = {
        type: types.ADD_USER,
        name: user,
    };

    expect(addUser(user)).toEqual(action);
});

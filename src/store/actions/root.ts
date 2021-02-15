import * as types from './types';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Message as MessageType } from '../../types/message';
import { User as UserType } from '../../types/user';

export const addMessage = (message: string, user: string): AddMessage => ({
    type: types.ADD_MESSAGE,
    id: uuidv4(),
    message,
    user,
    time: dayjs().format('m:ss'),
});

export interface AddMessage extends MessageType {
    type: types.ADD_MESSAGE;
}

export const addUser = (name: string): AddUser => ({
    type: types.ADD_USER,
    name,
});

export interface AddUser extends UserType {
    type: types.ADD_USER;
}

export const messageReceived = (id: string, message: string, user: string): MessageReceived => ({
    type: types.MESSAGE_RECEIVED,
    id,
    message,
    user,
    time: dayjs().format('m:ss'),
});

export interface MessageReceived extends MessageType {
    type: types.MESSAGE_RECEIVED;
}

export const usersList = (users: UserType[]): UsersList => ({
    type: types.USERS_LIST,
    users,
});

export interface UsersList {
    type: types.USERS_LIST;
    users: UserType[];
}

export const login = (name: string): Login => ({
    type: types.LOGIN,
    name,
});

export interface Login {
    type: types.LOGIN;
    name: string;
}

export type Interfaces = AddMessage | AddUser | MessageReceived | UsersList | Login;

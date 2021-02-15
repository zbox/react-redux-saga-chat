import { Message as MessageType } from './message';
import { User as UserType } from './user';

export interface StoreState {
    login: string;
    messages: MessageType[];
    users: UserType[];
}

import React, { Component } from 'react';
import { Message as MessageType } from '../../types/message';
import { User as UserType } from '../../types/user';
import { Dict } from '../../types/dict';

class UserList extends Component<UserListProps> {
    sortKeysDescending(obj: Dict): string[] {
        return Object.keys(obj).sort((a, b) => {
            return obj[b] - obj[a];
        });
    }

    render(): React.ReactNode {
        const { login, users, messages } = this.props;

        const userMsgCount = messages.reduce((grp, item) => {
            const user = item['user'];
            grp[user] = !grp[user] ? 1 : grp[user] + 1;
            return grp;
        }, {});

        const connectedUsers = {};
        const userMsgZeroed = users.reduce((acc, obj) => {
            const userName = obj.name;
            if (!userMsgCount[userName]) {
                acc[userName] = 0;
            }
            connectedUsers[userName] = true;
            return acc;
        }, {});

        const combinedMsgCounts = { ...userMsgZeroed, ...userMsgCount };

        /**
         * - highlight current user
         * - mark offline users (w/messages)
         * - messages count
         */
        const renderUser = (name) => (
            <>
                <span>
                    {login === name ? <strong>{name}</strong> : name}
                    {!connectedUsers[name] && '*'}
                </span>
                <span>{combinedMsgCounts[name] > 0 && `[ ${combinedMsgCounts[name]} ]`}</span>
            </>
        );

        return (
            <div className="userlist">
                <div className="userlist__header">Members:</div>
                <ul className="userlist__list">
                    {this.sortKeysDescending(combinedMsgCounts).map((key) => (
                        <li className="userlist__item" key={key}>
                            {renderUser(key)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

interface UserListProps {
    login: string;
    users: UserType[];
    messages: MessageType[];
}

export default UserList;

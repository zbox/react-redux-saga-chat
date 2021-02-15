import React from 'react';
import Screen from '../../containers/Screen';
import UserList from '../../containers/UserList';
import MessageBox from '../../containers/MessageBox';

const ChatPage: React.FC = () => (
    <div className="chat">
        <div className="chat__meta">
            <UserList />
        </div>
        <div className="chat__container">
            <Screen />
            <MessageBox />
        </div>
    </div>
);

export default ChatPage;

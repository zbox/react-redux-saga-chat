import React from 'react';
import { Message as MessageType } from '../../types/message';

const Message: React.FC<MessageType> = ({ message, user, time }) => {
    return (
        <div className="message">
            <div className="message__meta">
                <span className="message__time">{time}</span>
                <span className="message__user">{user}</span>
            </div>
            <div className="message__body">{message}</div>
        </div>
    );
};

export default Message;

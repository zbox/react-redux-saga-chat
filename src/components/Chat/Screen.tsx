import React from 'react';
import Message from './Message';
import { Message as MessageType } from '../../types/message';

const Screen: React.FC<ScreenProps> = ({ messages }) => {
    return (
        <div className="screen">
            <ul className="screen__list">
                {messages.map((message: MessageType) => (
                    <Message key={message.id} {...message} />
                ))}
            </ul>
        </div>
    );
};

interface ScreenProps {
    messages: MessageType[];
}

export default Screen;

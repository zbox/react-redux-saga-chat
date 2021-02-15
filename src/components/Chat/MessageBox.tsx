import React, { Component } from 'react';

class MessageBox extends Component<MessageBoxProps> {
    state = {
        message: '',
    };

    handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { value } = e.currentTarget;
        this.setState({
            message: value,
        });
    };

    keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            this.submitForm();
        }
    };

    submitForm = (): void => {
        if (this.state.message.length > 0) {
            this.props.addMessage(this.state.message, this.props.login);
            this.setState({
                message: '',
            });
        }
    };

    render(): React.ReactNode {
        const { message } = this.state;
        return (
            <div className="messagebox">
                <input
                    className="messagebox__input"
                    onChange={this.handleInputChange}
                    onKeyDown={this.keyDownHandler}
                    id="message"
                    name="message"
                    type="text"
                    placeholder="Your text"
                    value={message}
                />
                <button disabled={message.length === 0} className="messagebox__button" onClick={this.submitForm}>
                    Send
                </button>
            </div>
        );
    }
}

interface MessageBoxProps {
    addMessage: (message: string, login: string) => void;
    login: string;
}

export default MessageBox;

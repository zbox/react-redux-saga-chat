import React, { Component } from 'react';
import { History, LocationState } from 'history';

class ProfilePage extends Component<ProfilePageProps> {
    state = {
        isAuthenticated: false,
        login: '',
    };

    componentDidMount(): void {
        const login = localStorage.getItem('login');
        if (login) {
            this.setState({ login, isAuthenticated: true });
        }
    }

    handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget;
        this.setState({
            [name]: value,
        });
    };

    submitForm = (): void => {
        const login = this.state.login;
        localStorage.setItem('login', login);

        this.props.addUser(login);
        this.props.login(login);

        this.setState({ isAuthenticated: true });
        this.props.history.push('/');
    };

    render(): React.ReactNode {
        const { login, isAuthenticated } = this.state;
        return (
            <div className="profile">
                {!isAuthenticated ? (
                    <div className="loginform">
                        <input
                            name="login"
                            value={login}
                            onChange={this.handleInputChange}
                            className="loginform__input"
                            placeholder="Your name"
                            type="text"
                        />
                        <button disabled={login.length === 0} onClick={this.submitForm} className="loginform__submit">
                            Join
                        </button>
                    </div>
                ) : (
                    <h1>Profile {login}</h1>
                )}
            </div>
        );
    }
}

interface ProfilePageProps {
    addUser: (login: string) => void;
    login: (login: string) => void;
    history: History;
}

export default ProfilePage;

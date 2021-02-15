import React from 'react';
import renderer from 'react-test-renderer';
import ProfilePage from '../ProfilePage';
import history from '../../../store/history';

it('ProfilePage component renders correctly', () => {
    const props = {
        addUser: jest.fn(),
        login: jest.fn(),
        history,
    };
    const tree = renderer.create(<ProfilePage {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
});

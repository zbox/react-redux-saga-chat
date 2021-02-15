import React from 'react';
import ChatPage from '../ChatPage';
import {shallow} from 'enzyme';

it('ChatPage component renders correctly', () => {
    const tree = shallow(<ChatPage />);
    expect(tree).toMatchSnapshot();
});

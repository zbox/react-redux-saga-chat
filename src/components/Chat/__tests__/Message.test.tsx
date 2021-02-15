import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import renderer from 'react-test-renderer';
import Message from '../Message';

it('Message component renders correctly', () => {
    const props = {
        id: uuidv4(),
        user: 'user1',
        time: '19:00',
        message: 'message payload',
    };
    const tree = renderer.create(<Message {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
});

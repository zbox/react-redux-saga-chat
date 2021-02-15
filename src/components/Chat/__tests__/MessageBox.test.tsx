import React from 'react';
import renderer from 'react-test-renderer';
import MessageBox from '../MessageBox';

it('MessageBox component renders correctly', () => {
    const props = {
        login: 'user',
        addMessage: jest.fn(),
    };
    const tree = renderer.create(<MessageBox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
});

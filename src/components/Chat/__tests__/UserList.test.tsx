import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import UserList from '../UserList';

const props = {
    login: 'user1',
    users: [{ name: 'user1' }, { name: 'user2' }],
    messages: [{ id: 'message-uuid', message: 'message payload', user: 'user1', time: '10:00' }],
};

it('displays username and messages count correctly', () => {
    const enzymeWrapper = mount(<UserList {...props} />)
    expect(enzymeWrapper.find('.userlist__item:first-child').html()).toBe(
        '<li class="userlist__item"><span><strong>user1</strong></span><span>[ 1 ]</span></li>',
    );
});

it('UserList component renders correctly', () => {
    const tree = renderer.create(<UserList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
});

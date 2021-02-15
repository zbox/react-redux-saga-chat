import React from 'react';
import Screen from '../Screen';
import {shallow} from 'enzyme';

it('Screen component renders correctly', () => {
    const props = {
        messages: [],
    };
    const tree = shallow(<Screen {...props} />);
    expect(tree).toMatchSnapshot();
});

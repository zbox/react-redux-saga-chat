import React from 'react';
import renderer from 'react-test-renderer';
import store from '../../../store/root';
import { Provider } from 'react-redux';
import PageLoader from '../PageLoader';

it('PageLoader component renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <PageLoader />
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

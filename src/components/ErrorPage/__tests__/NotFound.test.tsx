import React from 'react';
import renderer from 'react-test-renderer';
import store from '../../../store/root';
import { Provider } from 'react-redux';
import history from '../../../store/history';
import { Router } from 'react-router-dom';
import NotFound from '../NotFound';

it('NotFound component renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <Router history={history}>
                    <NotFound />
                </Router>
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

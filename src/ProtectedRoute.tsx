import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { RouteProps } from 'react-router';
export default class ProtectedRoute extends Route<ProtectedRouteProps> {
    render(): React.ReactNode {
        let redirectPath = '';
        if (!localStorage.getItem('login')) {
            redirectPath = '/profile';
        }

        if (redirectPath) {
            const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
            return <Route {...this.props} component={renderComponent} render={undefined} />;
        } else {
            return <Route {...this.props} />;
        }
    }
}

interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType;
}

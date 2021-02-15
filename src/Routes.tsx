import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PageLoader from './components/Common/PageLoader';

const Chat = lazy(() => import('./components/Chat/ChatPage'));
const Profile = lazy(() => import('./containers/Profile'));
const NotFound = lazy(() => import('./components/ErrorPage/NotFound'));

const Routes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Switch>
                <ProtectedRoute exact path="/" component={Chat} />
                <Route exact path="/profile" component={Profile} />
                <Route component={NotFound} status={404} />
            </Switch>
        </Suspense>
    );
};

export default withRouter(Routes);

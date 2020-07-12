import React from 'react';

import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import { Login } from '@/presentation/pages';

const Router: React.FC = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact={true} component={Login} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
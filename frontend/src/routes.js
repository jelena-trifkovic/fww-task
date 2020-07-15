import React from 'react';
import { Route } from 'react-router-dom';

import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';

const BaseRouter = () => {
    return (
        <div>
            <Route exact path='/signin/' component={SigninForm}/>
            <Route exact path='/signup/' component={SignupForm}/>
        </div>
    );
}

export default BaseRouter;
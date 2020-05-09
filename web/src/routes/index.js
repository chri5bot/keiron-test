import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import signedOutFallback from '../helpers/signed-out-fallback'

import Home from '../views/Home'
import Login from '../views/Login'
import NoMatch from '../views/NoMatch'
import SignUp from '../views/SignUp'

const LoginFallBack = signedOutFallback(() => <Redirect to="/" />, Login)
const HomeFallBack = signedOutFallback(Home, () => <Redirect to="/login" />)
const SignUpFallBack = signedOutFallback(() => <Redirect to="/login" />, SignUp)


export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomeFallBack} />
                <Route path="/login" exact component={LoginFallBack} />
                <Route path="/sign-up" exact component={SignUpFallBack} />
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        </Router>
    )
}
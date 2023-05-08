/**
 * owner : Hitachi
 * author : Divyangi from Affine
 */
import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'


const Login = lazy(() => import('./components/Login'))

const DocumentsList = lazy(() => import('./components/Document'))

const QnA = lazy(() => import('./components/QnA'))



export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>

          <Route exact path="/login" component={Login} />

          <Route exact path="/application" component={DocumentsList} />

          <Route exact path="/resources" component={QnA} />

        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes

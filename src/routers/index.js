import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import asyncComponent from '../common/asyncComponent'

import LoginLayout from '../layout/LoginLayout'
import Login from '../modules/login/components/Login'
import MainLayout from '../layout/main-layout/containers'

const Patient = asyncComponent(() => import('./patient').then(module => module.default))

const Home = asyncComponent(() => import('../modules/home/containers').then(module => module.default))
const Settings = asyncComponent(() => import('./settings').then(module => module.default))

const Appointment = asyncComponent(() => import('../modules/appointment').then(module => module.default))

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/appointment/:selectedDay',
    component: Appointment,
  },
  {
    path: '/patient/:patienId',
    component: Patient,
  },
  {
    path: '/settings',
    component: Settings,
  },
]

const getRouters = () => (<Router>
  <RootContainer>
    <Switch>
      {
        routes.map(({ path, exact, component: Comp }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={props => (
              <MainLayout {...props}>
                <Comp {...props} />
              </MainLayout>
            )}
          />
        ))
      }
      <Route
        path="/login"
        render={props => (
          <LoginLayout {...props}>
            <Login {...props} />
          </LoginLayout>
        )}
      />
    </Switch>
  </RootContainer>
</Router>)

const RootContainer = styled.div`
  min-width: 1180px;
`


export default getRouters

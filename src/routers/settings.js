import React, { PropTypes } from 'react'
import { Route, Switch } from 'react-router-dom'
import SettingsLayout from '../layout/SettingsLayout'
import asyncComponent from '../common/asyncComponent'

const UserManagement = asyncComponent(() => import('../modules/user-management/containers').then(module => module.default))
const RoleManagement = asyncComponent(() => import('../modules/role-management/components').then(module => module.default))

const routes = [
  {
    path: '/user-management',
    component: UserManagement,
  },
  {
    path: '/role-management',
    component: RoleManagement,
  },
]

const SettingsRouter = ({ match }) => (
  <Switch>
    {
      routes.map(({ path, exact, strict, component: Comp }) =>
        (<Route
          key={path}
          path={`${match.url}${path}`}
          exact={exact}
          strict={strict}
          render={
            props => (
              <SettingsLayout {...props}>
                <Comp {...props} />
              </SettingsLayout>
            )
          }
        />),
      )
    }
  </Switch>
)

SettingsRouter.propTypes = {
  match: PropTypes.object.isRequired,
}
export default SettingsRouter

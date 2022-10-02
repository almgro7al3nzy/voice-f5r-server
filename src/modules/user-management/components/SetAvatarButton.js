import React, { PropTypes } from 'react'
import { Popover } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
// import ApolloClient from 'apollo-client'
import SetAvatarContainer from '../containers/SetAvatarContainer'
import { roleMaps } from '../constants'

class SetAvatarButton extends React.Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    resetStore: PropTypes.func.isRequired,
  }
  logout() {
    localStorage.removeItem('token')
    this.props.resetStore()
    this.props.client.resetStore()
  }
  render() {
    const fullName = get(this.props, 'userInfo.fullName')
    const avatar = get(this.props, 'userInfo.avatar')
    const role = get(this.props, 'userInfo.role')
    const roleObj = roleMaps.filter(o => o.value === role)
    return (
      <Popover
        // trigger="click"
        placement="bottomRight"
        content={
          <SetAvatarContainer
            {...this.props}
            onLogoutClick={() => this.logout()}
          />
        }
      >
        <LogoutButtonWrapper>
          <span>{fullName}</span> {roleObj.length > 0 && roleObj[0].label}
          <LogoutLink src={avatar} />
        </LogoutButtonWrapper>
      </Popover>
    )
  }
}
const LogoutButtonWrapper = styled.div`
  background-color: #fff;
  height: 54px;
  cursor: pointer;
`
const LogoutLink = styled.img`
  float: right;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #666;
  margin: 10px;
  &:hover {
    color: #999;
  }
`
export default SetAvatarButton

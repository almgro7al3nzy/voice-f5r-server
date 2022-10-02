import React, { PropTypes } from 'react'
import { Layout, Menu, Icon } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import HaiNanLogo from '../logo/logo.png'

const { Sider } = Layout
const routerMap = {
  home: '/',
  patient: '',
  settings: '/settings/user-management',
  appointment: (() => `/appointment/${moment().format('YYYY-MM-DD')}`)(),
}

const handledNavClick = ({ item, props }) => {
  const { isOpenSliderNav, history, togglePatientSider } = props
  if (routerMap[item.key] && (history.location.pathname !== routerMap[item.key])) {
    history.push(routerMap[item.key])
  }
  if (isOpenSliderNav || item.key === 'patient') {
    togglePatientSider()
  }
}

const menus = [
  { label: '主页', type: 'home', icon: 'home' },
  { label: '预约', type: 'appointment', icon: 'calendar' },
  { label: '病人', type: 'patient', icon: 'team' },
  { label: '设置', type: 'settings', icon: 'setting' },
]

const SiderBar = (props) => {
  let selectedKeys = ['home']
  if (/\/patient/.test(props.match.path)) {
    selectedKeys = ['patient']
  } else if (/\/settings/.test(props.match.path)) {
    selectedKeys = ['settings']
  } else if (/\/appointment/.test(props.match.path)) {
    selectedKeys = ['appointment']
  }
  return (<SiderContainer collapsed collapsedWidth={54}>
    <LogoIconContainer>
      <LogoIcon src={HaiNanLogo} />
    </LogoIconContainer>
    <StyledMenu
      theme="dark"
      defaultSelectedKeys={['home']}
      selectedKeys={selectedKeys}
      style={{ width: '54px' }}
      onClick={item => handledNavClick({ item, props })}
    >
      {
        menus.map(menu => (<Menu.Item
          key={menu.type}
        >
          <StyledIcon type={menu.icon} />
          <span>{menu.label}</span>
        </Menu.Item>))
      }
    </StyledMenu>
  </SiderContainer>)
}


SiderBar.propTypes = {
  match: PropTypes.object.isRequired,
}

const SiderContainer = styled(Sider) `
  z-index: ${props => props.theme.general.zIndex.MID};
  background-color: #26334b;
`
const LogoIconContainer = styled.div`
  background-color: #0cc4bb;
  width: 54px;
  height: 56px;
`

const LogoIcon = styled.img`
  width: 32px;
  margin: 13px 0 0 10px;
`
const StyledIcon = styled(Icon) `
  font-size: 20px !important;
  margin-left: -8px !important;
  line-height: 54px !important;
`
const StyledMenu = styled(Menu) `
  background: #26334b !important;
  color: rgba(255, 255, 255, 0.5) !important;
  .ant-menu-item {
    height: 54px !important;
    background: #26334b;
    color: rgba(255, 255, 255, 0.5);
  }
  .ant-menu-item-selected {
    background-color: #1a2430 !important;
    color: rgba(255, 255, 255, 1);
  }
`

export default SiderBar

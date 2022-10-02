import React, { PropTypes } from 'react'
import { Tabs } from 'antd'
import { ContentContainer, StyledSettings } from './styled-components'

const TabPane = Tabs.TabPane

const tabs = [
  { title: '用户管理', key: 'user-management' },
  { title: '权限管理', key: 'role-management' },
]

const SettingsLayout = ({
  children, history, location,
}) => (<StyledSettings>
  <ContentContainer>
    <Tabs
      type="card"
      activeKey={location.pathname.split('/')[2]}
      onTabClick={(key) => {
        history.push(`/settings/${key}`)
      }}
    >
      {tabs.map(tab =>
          (<TabPane tab={tab.title} key={tab.key}>
            {children}
          </TabPane>),
        )}
    </Tabs>
  </ContentContainer>
</StyledSettings>)

SettingsLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default SettingsLayout

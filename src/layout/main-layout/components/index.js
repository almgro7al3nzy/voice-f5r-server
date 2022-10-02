import React, { PropTypes } from 'react'
import { Layout } from 'antd'
import { Redirect } from 'react-router-dom'
import get from 'lodash/get'
// import isEmpty from 'lodash/isEmpty'
import PatientListSlider from '../../../modules/left-nav/containers/PatientListSlider'
import SiderBar from '../../../modules/left-nav/containers/Sider'
import ModalContainer from '../../../modules/modal/containers'
import ChatContainer from '../../../modules/chat/containers/ChatContainer'
import IncomingMessageButton from '../../../modules/chat/containers/IncomingMessageButton'
import SetAvatarButton from '../../../modules/user-management/containers/SetAvatarButton'
import VoiceChat from '../../../modules/chat/containers/VoiceChat'
// import LogoutButton from '../../../modules/user-management/containers/LogoutButton'

import {
  StyledLayout,
  StyledHeader,
  StyledContent,
  StyledFooter,
  HospitalName,
  SystemName,
  PowerBy,
  RightSideContainer,
  DividingLine,
} from './styled-components'

const MainLayout = (props) => {
  const token = localStorage.getItem('token')
  const from = { pathname: '/login' }
  props.data.refetch()
  if (!token) {
    localStorage.removeItem('token')
    return <Redirect to={from} />
  }
  const hospitalName = get(props, 'data.me.healthCareTeams.0.institution.name')
  return (
    <StyledLayout className="ant-layout-has-sider">
      <SiderBar {...props} />
      <Layout>
        <StyledHeader>
          <HospitalName>{hospitalName || '---'}</HospitalName>
          <SystemName>-高血压管理系统</SystemName>
          <PowerBy>Powered by iHealth</PowerBy>
          <RightSideContainer>
            <IncomingMessageButton />
            <DividingLine />
            <SetAvatarButton />
          </RightSideContainer>
        </StyledHeader>
        <StyledContent>
          {props.children}
          <VoiceChat
            tabIndex="0"
          />
          <ChatContainer history={props.history} />
        </StyledContent>
        <PatientListSlider history={props.history} />
        <StyledFooter>Power by iHealth 北京爱和健康科技有限公司</StyledFooter>
      </Layout>
      <ModalContainer />
    </StyledLayout>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default MainLayout

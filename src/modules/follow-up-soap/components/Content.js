import React, { PropTypes } from 'react'
import { Button } from 'antd'
import {
  EmptyScreen as StyledEmptyScreen,
  Screen,
  ContentLabel,
  Content,
  DashedLine,
} from './styled-components'

export const EmptyContent = ({ medicalHistoryExists, onClickAddSoap, isEditing }) => (
  medicalHistoryExists ? <StyledEmptyScreen>
    <h2>尚未有随访记录</h2>
    <Button
      type="primary"
      icon="file-add"
      onClick={onClickAddSoap}
      disabled={isEditing}
    >SOAP记录
    </Button>
  </StyledEmptyScreen>
    : <StyledEmptyScreen>
      <Button
        type="primary"
        icon="file-add"
        onClick={onClickAddSoap}
        disabled={isEditing}
      >SOAP记录
      </Button>
    </StyledEmptyScreen>
)

EmptyContent.propTypes = {
  onClickAddSoap: PropTypes.func.isRequired,
  medicalHistoryExists: PropTypes.bool,
}
function communicateForWay(key) {
  switch (key) {
    case 'face':
      return '面对面'
    case 'phone':
      return '电话'
    case 'APP':
      return 'APP'
    case 'wechat':
      return '微信'
    case 'other':
      return '其它'
    default:
      return '无'
  }
}
export const SoapContent = ({ soap }) => (
  <Screen>
    <ContentLabel>沟通方式 :{communicateForWay(soap.communicateWay)}</ContentLabel>
    <DashedLine />
    <ContentLabel>Subjective</ContentLabel>
    <Content>{soap.subjective}</Content>
    <DashedLine />
    <ContentLabel>Objective</ContentLabel>
    <Content>{soap.objective}</Content>
    <DashedLine />
    <ContentLabel>Assessment</ContentLabel>
    <Content>{soap.assessment}</Content>
    <DashedLine />
    <ContentLabel>Plan</ContentLabel>
    <Content>{soap.plan}</Content>
  </Screen>
)

SoapContent.propTypes = {
  soap: PropTypes.object.isRequired,
}
EmptyContent.propTypes = {
  isEditing: PropTypes.object.isRequired,
}

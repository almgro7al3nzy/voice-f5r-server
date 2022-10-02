import moment from 'moment'
import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Icon, Avatar, Row, Col, Input, Menu, Dropdown } from 'antd'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import { SHOW_INFOS } from '../constants/profile'
import queryPatientById from '../actions/profile'

const { TextArea } = Input

const getBMI = (height, weight) => {
  if (!height || !weight) {
    return '---'
  }
  return (weight / ((height / 100) * (height / 100))).toFixed(2)
}

export default class PatientProfile extends React.Component {
  static propTypes = {
    popupEditPatient: PropTypes.func.isRequired,
    mutationAddThePatientRemark: PropTypes.object.isRequired,
    openChatRoom: PropTypes.func.isRequired,
    mutate: PropTypes.func,
    patientId: PropTypes.string.isRequired,
    addFileAlert: PropTypes.func.isRequired,
  }
  state = {
    remark: '',
  }
  componentWillReceiveProps(nextProps) {
    const boundDetails = get(nextProps, 'data.me.healthCareTeams[0].patient.boundDetails', {})
    const { patientRemark } = boundDetails
    this.setState({ remark: patientRemark })
  }
  getMenu = () => {
    const handleMenuClick = (e) => {
      const { popupEditPatient, addFileAlert } = this.props
      const patient = get(this.props, 'data.me.healthCareTeams[0].patient', {})
      if (e.key === 'edit') {
        popupEditPatient(patient)
      } else {
        addFileAlert(this.props)
      }
    }
    const archivedManagement = get(
      this.props,
      'data.me.healthCareTeams[0].patient.boundDetails.archivedManagement',
    )
    return (
      <Menu onClick={handleMenuClick}>
        {!archivedManagement && <Menu.Item key="edit">个人信息</Menu.Item>}
        <Menu.Item key="file">归档</Menu.Item>
      </Menu>
    )
  }
  addThePatientInformation = (e) => {
    const { mutationAddThePatientRemark, patientId } = this.props
    const mutate = mutationAddThePatientRemark
    mutate({
      variables: {
        patientId,
        patientRemark: e.target.value,
      },
    })
    this.setState({ remark: e.target.value })
  }
  handlePatientsSearch = debounce(() => {
    const { mutate } = this.props
    const patient = get(this.props, 'data.me.healthCareTeams[0].patient', {})
    const { _id } = patient
    const isStarred = get(patient, 'boundDetails.isStarred')
    const variables = {
      isStarred: !isStarred,
      patientId: _id,
    }
    mutate({
      variables,
      refetchQueries: [
        {
          query: queryPatientById,
          variables: {
            patientId: _id,
          },
        },
      ],
    })
  }, 500)

  render() {
    const { openChatRoom } = this.props
    const patient = get(this.props, 'data.me.healthCareTeams[0].patient', {})
    const boundDetails = get(this.props, 'data.me.healthCareTeams[0].patient.boundDetails', {})
    const doctorName = get(
      this.props,
      'data.me.healthCareTeams[0].patient.leaderOfHealthCareTeam.fullName',
      {},
    ).toString()
    const { avatar, fullName, createdAt, device } = patient
    const isStarred = get(patient, 'boundDetails.isStarred')
    const archivedManagement = get(patient, 'boundDetails.archivedManagement')
    const IDNumber = get(patient, 'boundDetails.identityInfo.IDNumber')
    const { height, weight } = boundDetails
    const BMI = getBMI(height, weight)
    const jsVersion = device ? device.jsVersion : '无'
    const systemVersion = device
      ? `${device.model} ${device.systemName} ${device.systemVersion}`
      : '无'
    const boundDetailsInfo = {
      ...boundDetails,
      BMI,
      createdAt: moment(createdAt).format('YYYY-MM-DD'),
      jsVersion,
      systemVersion,
      IDNumber,
    }
    return (
      <LeftColor archivedManagement={archivedManagement}>
        <Header>
          <AvatarZone>
            <Avatar size="large" src={avatar} />
            <Favorite>
              <CustomizeIcon
                type={isStarred ? 'star' : 'star-o'}
                isStarred={isStarred}
                onClick={this.handlePatientsSearch}
              />
            </Favorite>
          </AvatarZone>
          <Name>{fullName}</Name>
          <AdditionalZone>
            <DoctorInfo>
              <DoctorLabel>管理医生</DoctorLabel>
              <span>{doctorName}</span>
            </DoctorInfo>
            <Dropdown overlay={this.getMenu()}>
              <CustomizeIcon type="edit" />
            </Dropdown>
            <CustomizeIcon type="message" onClick={openChatRoom} />
          </AdditionalZone>
        </Header>
        <Body>
          {SHOW_INFOS.map((info) => {
            const { isPatient } = info
            const tempObj = info
            tempObj.parent = isPatient ? patient : boundDetailsInfo
            return tempObj
          }).map(info => (
            <Attribute>
              <LABEL span={info.colSpan[0]}>{info.label}</LABEL>
              <VALUE span={info.colSpan[1]}>
                {info.parent[info.property] && info.getValue(info.parent[info.property])}
              </VALUE>
            </Attribute>
          ))}
        </Body>
        <TextArea
          placeholder="请再此填写备注信息"
          autosize={{ minRows: 2, maxRows: 10 }}
          style={{ width: '173px', margin: '9px 9px' }}
          onBlur={this.addThePatientInformation}
          onChange={(e) => {
            this.setState({ remark: e.target.value })
          }}
          value={this.state.remark}
        />
      </LeftColor>
    )
  }
}

const DoctorInfo = styled.div`
  line-height: 30px;
`

const LeftColor = styled.div`
  background: ${props => (props.archivedManagement ? '#e9ebef' : 'white')};
`

const DoctorLabel = styled.span`
  color: ${props => props.theme.profile.color.LABEL};
  margin-right: 5px;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
`

const AvatarZone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 18px 10px 9px;
`

const Favorite = styled.span`
  height: 60px;
  line-height: 60px;
  position: absolute;
  left: 70%;
`

const Name = styled.div`
  font-weight: bold;
  font-size: ${props => props.theme.general.size.LARGER};
`

const AdditionalZone = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`

const Body = styled.div`
  width: 100%;
`

const Attribute = styled(Row)`
  border-top: solid 1px ${props => props.theme.profile.color.BORDER};
  padding: 5px 10px;
`

const LABEL = styled(Col)`
  color: ${props => props.theme.profile.color.LABEL};
`

const VALUE = styled(Col)`
  color: ${props => props.theme.profile.color.VALUE};
  font-weight: 400;
  font-family: PingFangSC-Regular;
`

const CustomizeIcon = styled(Icon)`
  font-size: ${props => props.theme.general.size.LARGER};
  color: ${props => (props.isStarred ? '#0cc4bb' : '#979797')};
  margin: 7px 8px;
  cursor: pointer;
`

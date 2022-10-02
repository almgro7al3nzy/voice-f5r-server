import React, { PropTypes } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { hypertensionLevelMap } from '../../common/constants'

const genderMap = {
  MALE: '男',
  FEMALE: '女',
}

const showPropertys = [
  { key: 'gender', getValue: o => genderMap[o] },
  { key: 'dateOfBirth', getValue: o => `${moment().diff(moment(o), 'years')}岁` },
  { key: 'hypertensionLevel', getValue: o => hypertensionLevelMap[o] },
]

const ListItemHomeView = (props) => {
  const { patient, closeModal } = props
  if (!patient || !patient.boundDetails) return null
  const path = `/patient/${patient._id}/blood-pressure`
  const onClickName = () => {
    closeModal()
    window.open(path, '_blank')
  }
  return (
    <ItemContainer>
      <div>
        <Avatar src={patient.avatar} />
        <FullName onClick={() => onClickName()}>{patient.fullName}</FullName>
        {
          showPropertys
            .filter(o => patient.boundDetails[o.key])
            .map(property => (<InlineDiv key={property.key}>
              { property.key !== 'gender' && <LineSpace>|</LineSpace>}
              <LableWithStyle>{
                property.getValue(patient.boundDetails[property.key])
              }</LableWithStyle>
            </InlineDiv>))
        }
      </div>
    </ItemContainer>)
}

ListItemHomeView.propTypes = {
  patient: PropTypes.object.isRequired,
  closeModal: PropTypes.func,
}

const LableWithStyle = styled.span`
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #9b9b9b;
`

const ItemContainer = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid #cfcfcf;
  display: flex;
  color: #000000;
  justify-content: space-between;
`
const Avatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  vertical-align: bottom;
`
const InlineDiv = styled.div`
  display: inline-block;
  vertical-align: super;
`
const FullName = styled(InlineDiv)`
  margin: 0 10px;
  font-size: 14px;
  cursor: pointer;
  color: #5690c0;
`

const LineSpace = styled.div`
  display: inline-block;
  height: 13px;
  width: 6px;
  margin: 2px 2px 2px 6px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #9b9b9b;
`

export default ListItemHomeView

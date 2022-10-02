import React, { PropTypes } from 'react'
import { Card, Button } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import moment from 'moment'
import PhysicalExaminationTable from './PhysicalExaminationTable'


class PhysicalExamination extends React.Component {
  state = {
    BPButtonClass: ['default', 'default', 'default', 'selected'],
  }
  /* eslint-disable max-len */
  render() {
    const { popupAddPhysicalExamination } = this.props
    const boundDetails = get(this.props, 'queryPatientById.me.healthCareTeams[0].patient.boundDetails', {})
    const { archivedManagement } = boundDetails
    const dateOfBirth = get(boundDetails, 'dateOfBirth')
    const age = moment().diff(moment(dateOfBirth), 'years')
    const physicalExaminations = get(this.props, 'queryPhysicalExaminations.physicalExaminationsForPatient', {})
    let lastCreateTime = ''
    if (physicalExaminations && physicalExaminations.length > 0) {
      lastCreateTime = physicalExaminations
    }
    return (
      <div style={{ marginTop: '10px' }}>
        <BtnCard
          bordered
          title={
            <div>
              <span style={{ fontSize: '14px' }}>门诊查体记录</span>
              <Btn
                style={{ float: 'right' }}
                icon="edit"
                onClick={() => popupAddPhysicalExamination(lastCreateTime, null, age)}
                disabled={archivedManagement}
              >添加</Btn>
            </div>
          }
        >
          <PhysicalExaminationTable {...this.props} physicalExaminations={physicalExaminations} age={age} />
        </BtnCard>
      </div>
    )
  }
}

PhysicalExamination.propTypes = {
  popupAddPhysicalExamination: PropTypes.func.isRequired,
}

const BtnCard = styled(Card) `
.ant-card-head-title {
  width: 100%;
}
.ant-card-body {
  width: 100%;
}
> .ant-card-body {
  padding: 4px !important;
}
`
const Btn = styled(Button) `
margin-top: 10px;
border: none;
`

export default PhysicalExamination

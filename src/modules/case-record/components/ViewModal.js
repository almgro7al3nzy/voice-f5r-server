import React, { PropTypes } from 'react'
import { Card, Button, Row, Col } from 'antd'
import Moment from 'moment'
import styled from 'styled-components'
import NoDataPage from './NoDataPage'
import CaseRecord from './CaseRecord'

import { TabsLayout } from '../../../layout/patient-layout/components'
import Bloodchart from '../../blood-pressure/components/Bloodchart.js'
import Pulsechart from '../../blood-pressure/components/Pulsechart.js'

class ViewModal extends React.Component {
  // caseRecordsForPatient = props.data.caseRecordsForPatient || []
  // popupEditCaseRecord = props.popupEditCaseRecord
  constructor(props) {
    super(props)
    // init a state for undefined
    this.state = {
      activeTab: undefined,
      activeKey: undefined,
      // editable: false,
      startDate: undefined,
      endDate: undefined,
      period: 'default',
    }
  }

  changeState = (stateEntity) => {
    this.setState(stateEntity)
  }

  render() {
    const isBtnHidden = 1
    const {
      popupEditCaseRecord,
      queryCaseOfachive,
      data: { caseRecordsForPatient },
    } = this.props
    const isEditing = queryCaseOfachive.patient
      ? queryCaseOfachive.patient.boundDetails.archivedManagement
      : ''
    let isAddBtnEditable = true
    if (caseRecordsForPatient && caseRecordsForPatient.length > 0) {
      const firstItemDate = new Moment(caseRecordsForPatient[0].createdAt).format('YYYY-MM-DD')
      const today = new Moment().format('YYYY-MM-DD')
      if (firstItemDate === today) {
        isAddBtnEditable = false
      }
    }
    const newTab = this.state.activeTab ? this.state.activeTab.prescription.medicines : null
    const btns = [
      <Btn
        ghost
        icon="file-add"
        onClick={() => popupEditCaseRecord(caseRecordsForPatient, newTab)}
        disabled={isEditing || !isAddBtnEditable}
      >
        新病历
      </Btn>,
    ]

    if (caseRecordsForPatient && caseRecordsForPatient.length > 0) {
      btns.push(
        <Btn
          ghost
          icon="edit"
          onClick={() => popupEditCaseRecord(caseRecordsForPatient, this.state.activeTab)}
          disabled={isEditing}
          // disabled={!this.state.editable}
        >
          编辑
        </Btn>,
      )
    }
    return (
      <Row>
        <Col span={16}>
          <TabsLayout
            buttons={btns}
            content={
              caseRecordsForPatient && caseRecordsForPatient.length > 0 ? (
                <CaseRecord content={caseRecordsForPatient} changeState={this.changeState} />
              ) : (
                <NoDataPage
                  popupNewRecord={popupEditCaseRecord}
                  caseRecordsForPatient={caseRecordsForPatient}
                  isEditing={isEditing}
                />
              )
            }
          />
        </Col>
        <Col span={8}>
          <ChartBox>
            <Card
              bordered
              style={{ marginBottom: '10px' }}
              title={
                <div>
                  <span style={{ fontSize: '14px' }}>血压趋势</span>
                  <span
                    style={{
                      fontSize: '14px',
                      marginLeft: '8px',
                      color: 'gray',
                      fontWeight: 'normal',
                    }}
                  >
                    ({new Moment(this.state.startDate).format('YYYY-MM-DD')} 至{' '}
                    {new Moment(this.state.endDate).format('YYYY-MM-DD')})
                  </span>
                </div>
              }
            >
              {
                <Bloodchart
                  {...this.props}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  period={this.state.period}
                  isBtnHidden={isBtnHidden}
                />
              }
            </Card>
            <Card
              bordered
              style={{ marginBottom: '10px' }}
              title={
                <div>
                  <span style={{ fontSize: '14px' }}>脉搏趋势</span>
                  <span
                    style={{
                      fontSize: '14px',
                      marginLeft: '8px',
                      color: 'gray',
                      fontWeight: 'normal',
                    }}
                  >
                    ({new Moment(this.state.startDate).format('YYYY-MM-DD')} 至{' '}
                    {new Moment(this.state.endDate).format('YYYY-MM-DD')})
                  </span>
                </div>
              }
            >
              {
                <Pulsechart
                  {...this.props}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  period={this.state.period}
                />
              }
            </Card>
          </ChartBox>
        </Col>
      </Row>
    )
  }
}

ViewModal.propTypes = {
  data: PropTypes.object.isRequired,
  popupEditCaseRecord: PropTypes.func.isRequired,
  queryCaseOfachive: PropTypes.func.isRequired,
}

const Btn = styled(Button)`
  color: #fff;
  border: none;
  padding-right: 0px;
`
const ChartBox = styled.div`
  margin-left: 20px;
`

export default ViewModal

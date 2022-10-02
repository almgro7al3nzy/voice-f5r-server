// React的主体
import React, { PropTypes } from 'react'
// Tabs标签
import { Tabs } from 'antd'
import Moment from 'moment'
import styled from 'styled-components'
import _ from 'lodash'

// 药物列表项
import PrescriptionMedicineItem from './PrescriptionMedicineItem'
// import ChartBloodPressure from '../../blood-pressure/components/chart-blood-pressure'

// TabPane1111
const TabPane = Tabs.TabPane
class MedicalDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: this.props.content[0]._id,
      activeTab: this.props.content[0],
      editable: new Moment(this.props.content[0].createdAt).add(24, 'h') >= new Moment(),
    }
    if (this.props.content.length === 1) {
      // only one record
      const startDate = this.props.content[0].caseRecordDate
      const endDate = Moment().toISOString()
      this.chartReRender(startDate, endDate)
    } else {
      const startDate = this.props.content[0].caseRecordDate
      const lastRecord = _.find(
        this.props.content,
        tabItem => new Moment(tabItem.caseRecordDate) > new Moment(startDate),
      )
      if (lastRecord) {
        this.chartReRender(lastRecord.caseRecordDate, startDate)
      } else {
        this.chartReRender(startDate, Moment().toISOString())
      }
    }
    this.props.changeState(this.state)
  }
  onActiveChange = (activeKey) => {
    const stateEntity = {
      activeKey,
      activeTab: _.find(this.props.content, i => i._id === activeKey),
    }
    stateEntity.editable = new Moment(stateEntity.activeTab.createdAt).add(24, 'h') >= new Moment()
    this.setState(stateEntity)
    // 修改外部component的state
    this.props.changeState(stateEntity)

    if (this.props.content.length === 1) {
      // only one record
      const startDate = stateEntity.activeTab.caseRecordDate
      const endDate = Moment().toISOString()
      this.chartReRender(startDate, endDate)
    } else {
      const startDate = stateEntity.activeTab.caseRecordDate
      const nextDate = _.findLast(
        this.props.content,
        tabItem => new Moment(tabItem.caseRecordDate) > new Moment(startDate),
      )
      console.log(this.props.content, nextDate)
      if (nextDate) {
        this.chartReRender(startDate, nextDate.caseRecordDate)
      } else {
        this.chartReRender(startDate, Moment().toISOString())
      }
    }
  }

  chartReRender = (startDate, endDate) => {
    console.log(`Start date is ${startDate}. End date is ${endDate}`)
    this.props.changeState({
      startDate,
      endDate,
      period: 'betweenDate',
    })
  }
  render() {
    return (
      <ContentContainer>
        <Tabs
          tabPosition="left"
          style={{ height: 'calc(100vh - 192px)', minHeight: '500px', display: 'flex' }}
          onChange={this.onActiveChange}
        >
          {this.props.content.map(c => (
            <TabPane
              tab={new Moment(c.createdAt).format('YYYY-MM-DD')}
              key={c._id}
              style={{ background: 'white' }}
            >
              <Root>
                <Row>
                  <Label
                    title={`创建时间：${new Moment(c.createdAt).format(
                      'YYYY-MM-DD HH:mm:ss',
                    )}，编辑截至时间：${new Moment(c.createdAt)
                      .add(24, 'h')
                      .format('YYYY-MM-DD HH:mm:ss')}`}
                  >
                    主诉：
                  </Label>
                  <Content>
                    {c.patientDesc.description.split('\n').map(item => (
                      <div>
                        {item}
                        <br />
                      </div>
                    ))}
                  </Content>
                </Row>
                <DashedLine />
                <Row>
                  <Label>查体：</Label>
                  <Content>
                    {c.bodyCheckup.description.split('\n').map(item => (
                      <div>
                        {item}
                        <br />
                      </div>
                    ))}
                  </Content>
                </Row>
                <DashedLine />
                <Row>
                  <Label>检验：</Label>

                  <Content>{c.laboratoryTests.description}</Content>
                </Row>
                <DashedLine />
                <Row>
                  <Label>诊断：</Label>
                  <Content>{c.diagnosis.description}</Content>
                </Row>
                <DashedLine />
                <Row>
                  <Label>控制目标</Label>
                  <Content>
                    {c.targetBP
                      ? `  高压 ${c.targetBP.HP.join('-')}        低压 ${c.targetBP.LP.join('-')}`
                      : '无'}
                  </Content>
                </Row>
                <DashedLine />
                <Row>
                  <Label>处方：</Label>
                  <Content>
                    {c.prescription.medicines.length > 0 ? (
                      c.prescription.medicines.map(mdc => (
                        <PrescriptionMedicineItem
                          name={mdc.name}
                          dosage={mdc.dosage}
                          usage={mdc.usage}
                          status={mdc.status}
                        />
                      ))
                    ) : (
                      <div>未服用药物</div>
                    )}
                  </Content>
                </Row>
                <DashedLine />
                <Row>
                  <Label>备注：</Label>
                  <Content>{c.noteMessage ? c.noteMessage.description : '无'}</Content>
                </Row>
                <DashedLine />
                <Row>
                  <ReviewLabel>下次复诊时间:</ReviewLabel>
                  <Content>
                    {c.reviewTime ? Moment(c.reviewTime).format('YYYY年MM月DD日') : '无'}
                  </Content>
                </Row>
                <DashedLine />
              </Root>
            </TabPane>
          ))}
        </Tabs>
      </ContentContainer>
    )
  }
}

export const Root = styled.div`
  background-color: white;
  display: flex;
  flex: 1;
  justify-content: stretch;
  flex-direction: column;
`
export const Row = styled.div`
  // background-color: blue;
  flex: 1 1;
  display: flex;
`
export const Label = styled.div`
  // background-color: green;
  flex: 0 0 50px;
  font-family: PingFangSC;
  font-size: 12px;
  font-weight: 600;
  color: black;
`
export const ReviewLabel = styled.div`
  flex: 0 0 80px;
  font-family: PingFangSC;
  font-size: 12px;
  font-weight: 600;
  color: black;
`
export const Content = styled.div`
  // background-color: gray;
  flex: 1;
  font-family: PingFangSC;
  font-size: 12px;
  text-align: left;
  color: #666666;
  word-break: break-all;
  white-space: pre-wrap;
`

MedicalDetails.propTypes = {
  content: PropTypes.object,
  changeState: PropTypes.func,
}

const ContentContainer = styled.div`
  flex: 1;
  background-color: white;
  > .ant-tabs > .ant-tabs-bar {
    .ant-tabs-nav-container {
      background-color: #5a7394;
      .ant-tabs-tab-prev {
        background-color: rgba(233, 235, 239, 0.2) !important;
      }
      .ant-tabs-tab-next {
        background-color: rgba(233, 235, 239, 0.2) !important;
        right: 0px;
      }
      .ant-tabs-tab {
        margin-bottom: 0px;
        background-color: rgba(233, 235, 239, 0.2) !important;
        border: 1px solid rgba(233, 235, 239, 0) !important;
        color: #fff;
        width: 120px;
        &:hover {
          background-color: rgba(233, 235, 239, 0.4) !important;
        }
      }

      .ant-tabs-tab-active {
        margin-bottom: 0px;
        background-color: #fff !important;
        color: #26344b !important;
        width: 120px;
        &:hover {
          background-color: #e9ebef !important;
        }
      }
      .ant-tabs-ink-bar {
        width: 0px !important;
      }
      .ant-tabs-ink-bar {
        right: 0px !important;
      }
    }
  }
  .ant-tabs-content {
    background-color: white;
    padding: 16px 11px;
    flex: 1;
    overflow-y: auto;
  }
`

export const ContentLabel = styled.div`
  font-size: 14px;
  color: #39475b;
  margin-bottom: 14px;
`

// export const Content = styled.div`
//   font-size: 12px;
//   color: ${props => props.theme.general.color.TITLE};
//   white-space: pre-wrap;
// `

export const DashedLine = styled.div`
  border-bottom: 1px dashed #ccc;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  margin: 20px 0;
`

export default MedicalDetails

// export default compose(
//   graphql(getBPPatientInfo, {
//     name: 'queryGetBPPatientInfo',
//     variables: props => ({
//       patientId: props.patientId,
//     }),
//   }),
// )(MedicalDetails)

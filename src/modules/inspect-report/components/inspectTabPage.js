import React, { PropTypes } from 'react'
import { Button, Tabs, Radio, Icon, Popconfirm } from 'antd'
import styled from 'styled-components'
import filter from 'lodash/filter'
import get from 'lodash/get'
import moment from 'moment'
import InspectForm from './InspectForm'
import NoDataPage from './NoDataPage'
/* eslint-disable */
import { queryInspectReportById } from '../actions/queries'

const TabPane = Tabs.TabPane
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const ispectMapping = {
  biochemistry: '血检检验报告',
  colorDoppler: '尿检检验报告',
  immune: '心电图检验报告',
  tempInspect: '24小时动态血压',
  ultrasonicInspect: '超声检验报告',
  otherInspect: '其他检验报告',
}

export default class TabPage extends React.Component {
  state = {
    activeKey: null,
    panes: [],
    ordelete: false,
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      const queryType = get(nextProps.data, 'variables.queryType')
      const inspectReports = (nextProps.data.patient.inspectReports || []).map(o => ({
        tab: queryType === 'TYPE' ? ispectMapping[o.type] : o._id,
        key: queryType === 'TYPE' ? ispectMapping[o._id] : o._id,
        imageList: o.imageList,
        inspectedAt: o.inspectedAt,
        type: o.type,
      }))
      let activeKey = inspectReports.length > 0 ? inspectReports[0].key : ''
      this.setState({
        panes: inspectReports,
        activeKey: this.state.activeKey || activeKey,
      })
    }
  }
  onChange(activeKey) {
    this.setState({
      activeKey: activeKey.toString(),
    })
  }
  onChangeQueryType(e) {
    const { _id } = this.props.data.patient
    this.setState({ activeKey: null })
    this.props.data.refetch({ patientId: _id, queryType: e.target.value })
  }

  dateSelect = selectedDate => {
    const date = moment(selectedDate).format('YYYY-MM-DD')
    const pane = {
      tab: date,
      key: date,
      inspectedAt: date,
    }
    this.setState({
      panes: [pane, ...this.state.panes],
      activeKey: date,
    })
    this.props.closeModal()
  }

  deletePane = ({ inspectedAt }) => {
    const { patientId, mutationRemoveInspectReport } = this.props
    const queryType = get(this.props.data, 'variables.queryType')
    if (inspectedAt) {
      const options = {
        variables: {
          patientId,
          inspectedAt,
        },
        refetchQueries: [
          {
            query: queryInspectReportById,
            variables: {
              patientId,
              queryType,
            },
          },
        ],
      }
      mutationRemoveInspectReport(options).then(() => {
        console.log('remove is ok')
      })
    }
  }
  render() {
    const { panes, activeKey } = this.state
    const queryType = get(this.props.data, 'variables.queryType')
    const inspectData = filter(panes, o => o.key === activeKey).map(o => {
      return {
        _id: o.key,
        inspectedAt: o.inspectedAt,
        type: o.type,
        imageList: o.imageList,
      }
    })
    return (
      <ContainerPage>
        <Header>
          {queryType === 'DATE' && (
            <Btn
              ghost
              icon="file-add"
              onClick={() => this.props.popupSelectDatePicker(this.dateSelect)}
            >
              创建检验报告
            </Btn>
          )}
          <RadioGroup onChange={e => this.onChangeQueryType(e)} defaultValue="DATE">
            <RadioButton value="DATE">按日期排序</RadioButton>
            <RadioButton value="TYPE">按类别排序</RadioButton>
          </RadioGroup>
        </Header>
        {panes.length ? (
          <ContentContainer>
            <Tabs
              type="card"
              tabPosition="left"
              style={{ height: 'calc(100vh - 210px)', minHeight: '500px' }}
              onChange={activeKey => this.onChange(activeKey)}
              activeKey={activeKey}
            >
              {panes.map(pane => (
                <TabPane
                  tab={
                    <span>
                      {queryType === 'DATE' && (
                        <Popconfirm
                          title="确定删除该日期所有检验报告吗？"
                          onConfirm={() => this.deletePane({ inspectedAt: pane.tab })}
                        >
                          <Icon
                            type="close"
                            style={{
                              position: 'absolute',
                              top: '13px',
                              left: '0px',
                            }}
                          />
                        </Popconfirm>
                      )}
                      {pane.tab}
                    </span>
                  }
                  key={pane.key}
                >
                  <InspectForm
                    id={Math.random()}
                    key={Math.random()}
                    inspectData={inspectData[0]}
                    activeKey={activeKey}
                    queryType={queryType}
                    {...this.props}
                  />
                </TabPane>
              ))}
            </Tabs>
          </ContentContainer>
        ) : (
          <NoDataPage />
        )}
      </ContainerPage>
    )
  }
}

const ContainerPage = styled.div`
  background: #ffffff;
  height: calc(100vh - 170px);
`
const FlexDiv = styled.div`
  display: flex;
`

const Btn = styled(Button)`
  color: #fff;
  border: none;
  padding-left: 0px;
`
const Header = FlexDiv.extend`
  background-color: ${props => props.theme.general.color.TITLE};
  border-radius: 4px 4px 0px 0px;
  padding: 5px 20px;
  color: #fff;
`
const ContentContainer = styled.div`
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
        border: 0px !important;
        color: #fff;
        &:hover {
          background-color: rgba(233, 235, 239, 0.4) !important;
        }
      }

      .ant-tabs-tab-active {
        margin-bottom: 0px;
        background-color: #fff !important;
        color: #26344b !important;
        &:hover {
          background-color: #e9ebef !important;
        }
      }
      .ant-tabs-ink-bar{
        width: 0px !important;
      }
      .ant-tabs-ink-bar{
        right:0px !important;
      }
    }
  }
  .ant-tabs-vertical.ant-tabs-left > .ant-tabs-bar {
    background: #7a8aa2;
  }
  .ant-tabs-vertical.ant-tabs-left > .ant-tabs-content {
    padding-left: 0px;

    .ant-table-thead > tr > th,.ant-table-tbody > tr > td {
        padding: 5px 8px;!important
        color: #596d8b;!important
       }
  }
  .ant-tabs-content {
    background-color: #ffffff;
    padding: 0px 10px;
  }
`
TabPage.propTypes = {
  popupSelectDatePicker: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
}

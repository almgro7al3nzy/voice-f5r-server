// 营养模块React侧面tab组件
import React, { PropTypes } from 'react'
import { Button, Tabs, Popconfirm } from 'antd'
import styled from 'styled-components'
// import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
// import get from 'lodash/get'
import moment from 'moment'
import NutritionFrom from '../components/NutritionForm'
import NoDataPage from './NoDataPage'
import { queryPatientNutritionList } from '../actions'
/* eslint-disable */

const TabPane = Tabs.TabPane

export default class TabPage extends React.Component {
  state = {
    activeKey: 'new-nt',
    panes: [],
    ordelete: false
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      const nutritions = (nextProps.data.queryNutritionForm || []).map(o => ({
        tab: moment(o.operateAt).format('YYYY-MM-DD'),
        key: o._id,
        batchInputs: o.batchInputs,
        remark: o.nutritionProblem,
      }))
      this.setState({
        panes: nutritions,
        activeKey: nutritions.length ? nutritions[0].key : 'new-nt',
      })
    }
  }
  onChange(activeKey) {
    this.setState({
      activeKey: activeKey.toString(),
    })
  }

  add = () => {
    const pane = { tab: moment().format('YYYY-MM-DD'), key: 'new-nt' }
    this.setState({
      panes: [pane, ...this.state.panes],
      activeKey: 'new-nt',
    })
  }

  deletePane() {
    const { patientId, mutationRemoveNutritionList } = this.props
    const refetchQueries = [{
      query: queryPatientNutritionList,
      variables: {
        patientId,
      },
    }]
    if (this.state.activeKey === 'new-nt') {
      this.setState({
        panes: this.state.panes.slice(1),
        activeKey: this.state.panes[1] ? this.state.panes[1].key : 'new-nt'
      })
    } else {
      mutationRemoveNutritionList({
        variables: {
          _id: this.state.activeKey,
        },
        refetchQueries,
      })
    }
  }
  render() {
    const { panes, activeKey } = this.state
    const { queryNutriTionOfachive, data: { queryNutritionForm } } = this.props
    const isEditing = queryNutriTionOfachive ? queryNutriTionOfachive.patient.boundDetails.archivedManagement : null
    let isSameToday = false
    if (queryNutritionForm && queryNutritionForm.length > 0) {
      if (moment().diff(moment(queryNutritionForm[0].operateAt), 'days') < 1) {
        isSameToday = true
      }
    }
    const nutritionData = filter(panes, o => o.key === activeKey).map(o => ({
      _id: o.key,
      batchInputs: o.batchInputs,
      remark: o.remark
    }))
    return (
      <ContainerPage>
        <Header>
          <Btn
            ghost
            icon="file-add"
            onClick={this.add}
            disabled={isEditing || isSameToday}
          >
            新营养
          </Btn>
          <Popconfirm title="确定删除该营养表吗？" onConfirm={() => {
            this.deletePane()
          }}>
            <Btn
              ghost
              icon="delete"
              disabled={isEditing}
            >
              删除
          </Btn>
          </Popconfirm>
        </Header>
        {
          panes.length ?
            <ContentContainer>
              <Tabs
                type="card"
                tabPosition="left"
                style={{ height: 'calc(100vh - 210px)', minHeight: '500px' }}
                onChange={activeKey => this.onChange(activeKey)}
                activeKey={activeKey}
              >
                {panes.map(pane =>
                  (<TabPane
                    tab={pane.tab}
                    key={pane.key}
                  >
                    <NutritionFrom nutritionData={nutritionData[0]} {...this.props} isEditing={isEditing} />
                  </TabPane>),
                )}
              </Tabs>
            </ContentContainer> : <NoDataPage editNutrition={this.add} isEditing={isEditing} />
        }
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

const Btn = styled(Button) `
  color: #fff;
  border: none;
  padding-right: 0px;
`
const Header = FlexDiv.extend`
  background-color: ${props => props.theme.general.color.TITLE};
  border-radius: 4px 4px 0px 0px;
  justify-content: flex-end;
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
  // queryNutritionForm: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
}

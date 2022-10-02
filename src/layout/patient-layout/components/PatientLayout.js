import React, { PropTypes } from 'react'
import { Layout, Tabs } from 'antd'
import styled from 'styled-components'
import PatientProfile from '../../../modules/patient/containers/Profile'
import Archived from '../containers/Archived'

const TabPane = Tabs.TabPane

const tabs = [
  { title: '概况', key: 'patient-detail' },
  { title: '血压', key: 'blood-pressure' },
  { title: '病史', key: 'medical-history' },
  { title: '营养', key: 'nutrition-form' },
  { title: '电子病历', key: 'case-record' },
  { title: '随访SOAP', key: 'follow-up-soap' },
  { title: '检验报告', key: 'inspect-report' },
]

export class PatientLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    setActivePatient: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const patientId = location.pathname.split('/')[2]
    this.props.setActivePatient(patientId)
  }
  render() {
    const { location, history, children } = this.props
    return (
      <LayoutWithStyle>
        <div style={{ display: 'flex' }}>
          <PatientContainer>
            <PatientProfile patientId={location.pathname.split('/')[2]} />
          </PatientContainer>
          <ContentContainer>
            <Tabs
              type="card"
              activeKey={location.pathname.split('/')[3]}
              onTabClick={(key) => {
                const paths = location.pathname.split('/')
                history.push(`/patient/${paths[2]}/${key}`)
              }}
            >
              {tabs.map(tab =>
                (<TabPane tab={tab.title} key={tab.key}>
                  {children}
                </TabPane>),
              )}
            </Tabs>
          </ContentContainer>
        </div>
        <Archived patientId={location.pathname.split('/')[2]} />
      </LayoutWithStyle>
    )
  }
}

const LayoutWithStyle = styled(Layout) `
  position: relative;
`

const PatientContainer = styled.div`
  width: 190px;
  background: #fff;
  height: calc(100vh - 81px);
  min-height: ${props => props.theme.general.height.min};
  overflow-y: auto;
`

const ContentContainer = styled.div`
  position: absolute;
  left: 190px;
  right: 0;
  height: calc(100vh - 81px);
  min-height: ${props => props.theme.general.height.min};
  overflow-y: auto;
  background: #e9ebef;

  > .ant-tabs > .ant-tabs-bar {
    margin-bottom: 0;

    .ant-tabs-nav-container {
      padding: 19px 2px;
      background-color: #5a7394;
      height: 50px !important;

      .ant-tabs-tab {
        line-height: 32px;
        background-color: rgba(233, 235, 239, 0.2) !important;
        border: 1px solid rgba(233, 235, 239, 0) !important;
        color: #fff;

        &:hover {
          background-color: rgba(233, 235, 239, 0.4) !important;
        }
      }

      .ant-tabs-tab-active {
        background-color: #e9ebef !important;
        color: #26344b !important;

        &:hover {
          background-color: #e9ebef !important;
        }
      }
    }
  }

  .ant-tabs-content {
    background-color: #e9ebef;
    padding: 16px 11px;
  }
`

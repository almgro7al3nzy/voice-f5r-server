import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Input, Icon, Tabs, Select, Button } from 'antd'

const Search = Input.Search
const Option = Select.Option

export const PatientListHeader = ({
  popupAddPatient,
  handlePatientsSearch,
  handleJoinSelectChange,
  history,
}) => (
  <ViewAddPatient>
    <AddPatientContainer onClick={() => popupAddPatient(history)}>
      <AddIcon type="user-add" />
      <LableWithStyle>新患者</LableWithStyle>
    </AddPatientContainer>
    <Header>
      <SearchWithStyle
        placeholder="患者姓名/手机号"
        onChange={e => handlePatientsSearch(e.target.value)}
      />
      <SelectWithStyle placeholder="全部患者" onChange={e => handleJoinSelectChange(e)}>
        <Option value="ALL">全部患者</Option>
        <Option value="TODAY">今日入组患者</Option>
        <Option value="THREE">最近3天入组患者</Option>
        <Option value="WEEK">最近7天入组患者</Option>
      </SelectWithStyle>
    </Header>
  </ViewAddPatient>
)

PatientListHeader.propTypes = {
  popupAddPatient: PropTypes.func.isRequired,
  handlePatientsSearch: PropTypes.func.isRequired,
  history: PropTypes.object,
  handleJoinSelectChange: PropTypes.func.isRequired,
}

export const LableWithStyle = styled.span`
  opacity: 0.5;
  font-family: PingFangSC;
  font-size: 12px;
  color: #ffffff;
`
export const PatientListContainer = styled.div`
  width: 320px;
  height: 100%;
  background-color: #1a2430;
  font-size: 12px;
  font-family: PingFangSC;
  color: #ffffff;
  display: flex;
  flex-direction: column;
`

export const TabsWithStyle = styled(Tabs)`
  .ant-tabs-tabpane {
    height: calc(100vh - 225px);
    overflow-y: auto;
  }
  .ant-tabs-bar {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 5px;
    /* left: 54px; */
    z-index: 1;
    width: 320px;
    background: #1a2430;
  }
  .ant-tabs-nav-wrap {
    text-align: center;
  }
  .initials {
    font-size: 12px;
    color: #ffffff;
    opacity: 0.5;
  }
  .initials:hover {
    font-size: 18px;
    color: #ffffff;
    opacity: 1 !important;
  }
`
const AddIcon = styled(Icon)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  font-weight: 600;
`
const SearchWithStyle = styled(Search)`
  width: 140px !important;
  input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-family: PingFangSC-Regular;
  }
  .ant-input {
    width: 140px;
    height: 28px;
    border-radius: 4px;
    border: solid 1px rgba(255, 255, 255, 0.2);
    background-color: rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }
  .ant-input-search-icon {
    color: white;
  }
`
const SelectWithStyle = styled(Select)`
  width: 170px !important;
  margin-left: 12px !important;
  .ant-select-selection--single {
    background-color: #1a2430;
    border: solid 1px rgba(255, 255, 255, 0.2);
  }
  .ant-select-arrow {
    color: white !important;
  }
`

const Header = styled.div`
  padding: 20px 10px;
  display: flex;
`
const AddPatientContainer = styled(Button)`
  line-height: 28px;
  margin-left: 20px;
  margin-top: 20px;
  width: 90px;
  border: none !important;
  background-color: #1a2430 !important;
`
export const SortWordContainer = styled.div`
  &::-webkit-scrollbar {
    width: 0px;
  }
  height: calc(100vh - 230px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 5px;
  line-height: 18px;
  border: none !important;
  background-color: #1a2430 !important;
  word-wrap: break-word;
  position: fixed;
  right: -35px;
  color: #ffffff !important;
`
export const ViewAddPatient = styled.div`
  z-index: 2;
  background: #1a2430;
  width: 320px;
  flex: 0 0;
`

import React, { PropTypes } from 'react'
import { Tabs } from 'antd'
import moment from 'moment'
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import pinyin from 'pinyin-es5'
import debounce from 'lodash/debounce'
import {
  PatientListContainer,
  PatientListHeader,
  TabsWithStyle,
  SortWordContainer,
} from './styled-component'
import ListItem from './ListItem'
import queryPatients from '../actions/patientList'
import SearchPatientList from './SearchPatientList'

const TabPane = Tabs.TabPane

const tabs = [{ title: '全部患者', key: 'ALL' }, { title: '重点关注', key: 'isStarred' }]

const getPatients = (key, patientList) => {
  const filters =
    key === 'ALL'
      ? patientList
      : patientList.filter(o => o.boundDetails && o.boundDetails.isStarred)
  return sortBy(filters, [
    (o) => {
      const pinyinArray = pinyin(o.fullName, { style: pinyin.STYLE_NORMAL })
      return pinyinArray.reduce((prev, curr) => prev + curr, '')
    },
  ])
}
class PatientList extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    togglePatientSider: PropTypes.func.isRequired,
    setActivePatient: PropTypes.func.isRequired,
  }
  state = {
    searchPatientList: [],
    isSearch: false,
    selectValue: 'ALL',
  }
  getDaysPatient(patientList) {
    switch (this.state.selectValue) {
      case 'ALL': {
        const initialsList = []
        const resultPatientList = []
        patientList.forEach((patient) => {
          const pinyinPatientName = pinyin(patient.fullName, { style: pinyin.STYLE_NORMAL }).reduce(
            (prev, curr) => prev + curr,
            '',
          )
          const initials = pinyinPatientName.substring(0, 1).toUpperCase()
          if (initialsList.indexOf(initials) < 0) {
            initialsList.push(initials)
            resultPatientList.push({
              type: 'dictionnry',
              text: initials,
            })
          }
          resultPatientList.push(patient)
        })
        return resultPatientList
      }
      case 'TODAY': {
        const initialsList = []
        const resultPatientList = []
        patientList.filter(o => moment().isSame(o.createdAt, 'day')).forEach((patient) => {
          const pinyinPatientName = pinyin(patient.fullName, { style: pinyin.STYLE_NORMAL }).reduce(
            (prev, curr) => prev + curr,
            '',
          )
          const initials = pinyinPatientName.substring(0, 1).toUpperCase()
          if (initialsList.indexOf(initials) < 0) {
            initialsList.push(initials)
            resultPatientList.push({
              type: 'dictionnry',
              text: initials,
            })
          }
          resultPatientList.push(patient)
        })
        return resultPatientList
      }
      case 'THREE': {
        const initialsList = []
        const resultPatientList = []
        patientList
          .filter(o =>
            moment()
              .subtract(3, 'days')
              .isBefore(o.createdAt, 'day'),
        )
          .forEach((patient) => {
            const pinyinPatientName = pinyin(patient.fullName, {
              style: pinyin.STYLE_NORMAL,
            }).reduce((prev, curr) => prev + curr, '')
            const initials = pinyinPatientName.substring(0, 1).toUpperCase()
            if (initialsList.indexOf(initials) < 0) {
              initialsList.push(initials)
              resultPatientList.push({
                type: 'dictionnry',
                text: initials,
              })
            }
            resultPatientList.push(patient)
          })
        return resultPatientList
      }
      case 'WEEK': {
        const initialsList = []
        const resultPatientList = []
        patientList
          .filter(o =>
            moment()
              .subtract(7, 'days')
              .isBefore(o.createdAt, 'day'),
        )
          .forEach((patient) => {
            const pinyinPatientName = pinyin(patient.fullName, {
              style: pinyin.STYLE_NORMAL,
            }).reduce((prev, curr) => prev + curr, '')
            const initials = pinyinPatientName.substring(0, 1).toUpperCase()
            if (initialsList.indexOf(initials) < 0) {
              initialsList.push(initials)
              resultPatientList.push({
                type: 'dictionnry',
                text: initials,
              })
            }
            resultPatientList.push(patient)
          })
        return resultPatientList
      }
      default:
        return []
    }
  }
  getinitialsList = () => {
    const elementList = []
    for (let code = 65; code < 91; code += 1) {
      elementList.push(
        <a className="initials" href={`#${String.fromCharCode(code)}`}>
          {String.fromCharCode(code)}
        </a>,
      )
    }
    return elementList
  }

  handlePatientClick = (patient) => {
    const { togglePatientSider, setActivePatient } = this.props
    const patientId = patient._id
    togglePatientSider()
    setActivePatient(patientId)
    window.open(`/patient/${patientId}/blood-pressure`, '_blank')
  }
  handleJoinSelectChange = (selectValue) => {
    // 获取数据源
    this.setState({ selectValue })
  }
  handlePatientsSearch = debounce((searchInput) => {
    const patientList = get(this.props, 'data.me.healthCareTeams[0].patients', [])
    let searchPatientList = []
    if (searchInput) {
      const filterPatients = patientList.filter(o => o.fullName.indexOf(searchInput) !== -1)
      const phonePatients = patientList.filter(o => o.mobile.indexOf(searchInput) !== -1)
      const tmpList = filterPatients && filterPatients.length > 0 ? filterPatients : phonePatients
      searchPatientList = sortBy(tmpList, [
        (o) => {
          const pinyinArray = pinyin(o.fullName, { style: pinyin.STYLE_NORMAL })
          return pinyinArray.reduce((prev, curr) => prev + curr, '')
        },
      ])
    }
    this.setState({ searchPatientList, isSearch: !!searchInput })
  }, 500)

  render() {
    const { loading } = this.props.data
    let patientList = []
    if (!loading) {
      patientList = get(this.props, 'data.me.healthCareTeams[0].patients', [])
    }
    const { searchPatientList, isSearch } = this.state
    return (
      <PatientListContainer>
        <PatientListHeader
          handlePatientsSearch={this.handlePatientsSearch}
          handleJoinSelectChange={this.handleJoinSelectChange}
          {...this.props}
        />
        <div style={{ flex: '1 1 auto' }}>
          {isSearch ? (
            <SearchPatientList
              patientList={searchPatientList}
              handlePatientClick={this.handlePatientClick}
            />) : (
              <TabsWithStyle defaultActiveKey="ALL">
                {tabs.map(tab => (
                  <TabPane tab={tab.title} key={tab.key}>
                    <SortWordContainer>{this.getinitialsList()}</SortWordContainer>
                    {!!patientList.length &&
                      this.getDaysPatient(getPatients(tab.key, patientList)).map(patient => (
                        <ListItem
                          key={patient._id}
                          patient={patient}
                          switchPatient={() => this.handlePatientClick(patient)}
                        />
                      ))}
                  </TabPane>
                ))}
              </TabsWithStyle>
            )}
        </div>
      </PatientListContainer>
    )
  }
}

export default graphql(queryPatients)(PatientList)

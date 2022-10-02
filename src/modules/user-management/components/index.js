import React, { PropTypes } from 'react'
import { Button } from 'antd'
import find from 'lodash/find'
import get from 'lodash/get'
import { departmentMaps, roleMaps, columns } from '../constants'
import { StyledTable, BtnContainer } from './styled-components'
import Operations from '../containers/Operations'

const formatDataSource = dataSource => dataSource.map((dataItem) => {
  const temp = { ...dataItem }
  temp.role = get(find(roleMaps, o => o.value === dataItem.role), 'label', '未设置')
  temp.department = get(find(departmentMaps, o => o.value === dataItem.department), 'label', '未设置')
  return temp
})

const formatColumns = props => columns.map((column) => {
  const temp = column
  if (column.key === 'action') {
    temp.render = (text, record) =>
      (<Operations
        patientProps={props}
        currentItem={record}
        healthCareProfessional={text}
      />)
  }
  return temp
})

const getColumns = props => formatColumns(props)

const UserManagement = (props) => {
  console.log(props, '@@@@')
  const healthCareTeams = get(props, 'data.me.healthCareTeams[0].institution.healthCareTeams', [])
  const data = []
  if (healthCareTeams.length) {
    healthCareTeams.forEach((healthCareTeam) => {
      data.push(...healthCareTeam.healthCareProfessionals)
    })
  }
  const dataSource = data.length ? formatDataSource(data) : []
  return (<div>
    <BtnContainer>
      <Button
        size="default"
        icon="plus"
        onClick={() => props.popupUpdateHealthCareProfessional()}
      >添加用户</Button>
    </BtnContainer>
    <StyledTable
      bordered
      dataSource={dataSource}
      columns={getColumns(props)}
    />
  </div>)
}

UserManagement.propTypes = {
  popupUpdateHealthCareProfessional: PropTypes.func.isRequired,
}

export default UserManagement

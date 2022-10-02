import React, { PropTypes } from 'react'
import { Select, Form } from 'antd'
import get from 'lodash/get'
import find from 'lodash/find'
import { roleMaps, doctorList } from '../constants'
import { StyledGutter } from './styled-components'

const FormItem = Form.Item
const Option = Select.Option

const getConfig = (getFieldValue, isDisabled) => {
  const role = getFieldValue('role')
  let rules = []
  if (isDisabled) return { disabled: true, rules }
  let disabled = true
  if (role && !doctorList.includes(role)) {
    rules = [{ required: true, message: '需要选择一个所属团队' }]
    disabled = false
  }
  return { rules, disabled }
}

const HealthCareTeam = ({
  getFieldDecorator,
  getFieldValue,
  data,
  initialValue = '',
  isDisabled,
}) => {
  const healthCareTeams = get(data, 'me.healthCareTeams[0].institution.healthCareTeams', [])
  return (<FormItem
    label="所属团队"
    wrapperCol={{ span: 12 }}
    labelCol={{ span: 4 }}
  >
    {
      getFieldDecorator('healthCareTeamId', {
        rules: getConfig(getFieldValue, isDisabled).rules,
        initialValue,
      })(
        <Select
          disabled={getConfig(getFieldValue, isDisabled).disabled}
          style={{ width: 180 }}
        >
          {
            healthCareTeams.length ?
            healthCareTeams.map((team) => {
              const { healthCareTeamId, fullName, role } = team.leaderOfHealthCareTeam || {}
              const roleText = get(find(roleMaps, o => o.value === role), 'label', '未设置')
              return (<Option
                key={healthCareTeamId}
                value={healthCareTeamId}
              >
                {fullName}<StyledGutter>|</StyledGutter>{roleText}
              </Option>)
            }) : <Option value="none">无团队</Option>
          }
        </Select>,
      )
    }
  </FormItem>)
}

HealthCareTeam.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  data: PropTypes.object,
  initialValue: PropTypes.string,
  isDisabled: PropTypes.bool,
}
export default HealthCareTeam

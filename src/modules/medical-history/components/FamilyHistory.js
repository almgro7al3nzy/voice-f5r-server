import React, { PropTypes } from 'react'
import { Checkbox, Input } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'
import { familyHistory as constantsFamilyHistory } from '../constants'
import { RowItem, OrderNumberLabel, StyledCheckboxGroup,
  FamilyHistoryRow, ColHeader, ColContent, FamilyHistoryCol } from './styled-components'

const getOptions = () => constantsFamilyHistory.options.map((o) => {
  const temp = {
    label: o.label,
    value: o.key,
  }
  return temp
})

const familyGroup = constantsFamilyHistory.familyGroup

const FamilyHistory = ({ getFieldDecorator, getFieldValue, familyHistory = {} }) => (<RowItem>
  <OrderNumberLabel>{constantsFamilyHistory.label}</OrderNumberLabel>
  <FamilyHistoryRow >
    {
      familyGroup.map((family, index) => (
        <FamilyHistoryCol
          span={6}
          noRightBorder={index === familyGroup.length - 1}
          key={family.key}
        >
          <ColHeader>
            {
              getFieldDecorator(`${constantsFamilyHistory.key}.${family.key}.isFlag`, {
                initialValue: !!get(familyHistory, `${family.key}.historyCategory`, []).length,
              })(
                <Checkbox>{family.label}</Checkbox>,
              )
            }
          </ColHeader>
          <ColContent>
            {
              getFieldValue(`${constantsFamilyHistory.key}.${family.key}.isFlag`) &&
              <div>
                {
                  getFieldDecorator(`${constantsFamilyHistory.key}.${family.key}.options`, {
                    initialValue: get(familyHistory, `${family.key}.historyCategory`, []),
                  })(
                    <StyledCheckboxGroup
                      options={getOptions()}
                      type="familyHistory"
                    />,
                  )
                }
                {
                  (getFieldValue(`${constantsFamilyHistory.key}.${family.key}.options`) || []).includes('OTHERS') &&
                  getFieldDecorator(`${constantsFamilyHistory.key}.${family.key}.comments`, {
                    initialValue: get(familyHistory, `${family.key}.comments`, ''),
                  })(
                    <StyledInput />,
                  )
                }
              </div>
            }
          </ColContent>
        </FamilyHistoryCol>
      ))
    }
  </FamilyHistoryRow>
</RowItem>)

FamilyHistory.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  familyHistory: PropTypes.any,
}

const StyledInput = styled(Input)`
  margin-left: 20px;
  width: 80%;
`

export default FamilyHistory

import React, { PropTypes } from 'react'
import { Checkbox } from 'antd'
import { BP_ROW_NAME, BP_COL_NAME } from '../constants'
import {
  StyledTd, StyledTh, StyledTable,
} from './styled-components'

const MeasureModule = ({ measureModule, handleCheckBtn, isCheck }) => (<StyledTable>
  <thead>
    <tr>
      <StyledTh />
      {
        BP_COL_NAME.map(col => <StyledTh key={col.title}>{col.title}</StyledTh>)
      }
    </tr>
  </thead>
  <tbody>
    {
      BP_ROW_NAME.map(row => (<tr key={row.title}>
        <StyledTd>{row.title}</StyledTd>
        {
          BP_COL_NAME.map(col => (<StyledTd key={row.title + col.title}>
            <Checkbox
              onChange={(e) => {
                handleCheckBtn(e.target.checked, row.property, col.property)
              }}
              checked={
                measureModule && measureModule[row.property]
                && measureModule[row.property][col.property]
              }
              disabled={isCheck}
            />
          </StyledTd>))
        }
      </tr>))
    }
  </tbody>
</StyledTable>)

MeasureModule.propTypes = {
  measureModule: PropTypes.object.isRequired,
  handleCheckBtn: PropTypes.func,
  isCheck: PropTypes.object.isRequired,
}
export default MeasureModule

import React from 'react'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { StyledTable, StyledTitle, StyledSpan } from './styled-components'
import { formatColumns } from './CustomRender'
import { unmeasurementCols } from '../constants'

const getColumns = props => formatColumns(props, unmeasurementCols)

const Unmeasurement = (props) => {
  let unmeasurePatients = get(props, 'data.me.unmeasurePatients', []).filter(item =>
    !get(item, 'patient.boundDetails.archivedManagement'),
  )
  unmeasurePatients = sortBy(unmeasurePatients, o => o.surplusDays)
  return (<div>
    <StyledSpan>{unmeasurePatients.length}</StyledSpan>
    <StyledTitle>人测量不足</StyledTitle>
    <StyledTable
      bordered
      dataSource={unmeasurePatients}
      columns={getColumns(props)}
    />
  </div>)
}

export default Unmeasurement

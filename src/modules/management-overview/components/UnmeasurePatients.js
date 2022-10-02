import React from 'react'
import styled from 'styled-components'
import UnmeasurePatientsItem from './UnmeasurePatientsItem.js'

const UnmeasurePatients = props => (
  <CardContent>
    <UnmeasurePatientsItem
      timeChoose={'3-7'}
      {...props}
    />
    <UnmeasurePatientsItem
      timeChoose={'7-14'}
      {...props}
    />
    <UnmeasurePatientsItem
      timeChoose={14}
      {...props}
    />
  </CardContent>
  )

const CardContent = styled.div`
  width: '100%';
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
`
export default UnmeasurePatients

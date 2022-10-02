import React, { PropTypes } from 'react'
import styled from 'styled-components'
import ListItemHomeView from './ListItemHomeView.js'

const ListContaner = (props) => {
  const { UnmeasurdPatients } = props
  return (
    <AlertDiv>
      {
        UnmeasurdPatients.map(patient =>
        (<ListItemHomeView
          key={patient._id}
          patient={patient}
          {...props}
        />),
      )}
    </AlertDiv>
  )
}

ListContaner.propTypes = {
  UnmeasurdPatients: PropTypes.array,
}

const AlertDiv = styled.div`
  max-height: 400px;
  overflow: auto;

`
export default ListContaner

import React, { PropTypes } from 'react'
import styled from 'styled-components'
import ListItem from './ListItem'

const SearchPatientList = ({ patientList, handlePatientClick }) => (
  <div>
    <SearchInfo>查询结果: </SearchInfo>
    <SearchContainer>
      {patientList.length ? (
        patientList.map(patient => (
          <ListItem
            key={patient._id}
            patient={patient}
            switchPatient={() => handlePatientClick(patient)}
          />
        ))
      ) : (
        <EmptyInfo>未查询到用户</EmptyInfo>
      )}
    </SearchContainer>
  </div>
)

SearchPatientList.propTypes = {
  patientList: PropTypes.array.isRequired,
  handlePatientClick: PropTypes.func.isRequired,
}

const SearchContainer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`

const SearchInfo = styled.div`
  margin: 0px 10px 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
`

const EmptyInfo = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 14px;
`

export default SearchPatientList

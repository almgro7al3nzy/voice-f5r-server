import React, { PropTypes } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { StyledCard, StyledCardHeader } from './styled-components'
import NoDataPage from './NoDataPage'
import MedicalDetails from './MedicalDetails'

const ViewModal = (props) => {
  const { medicalHistoryForPatient } = props.data
  const { popupEditMedicalHistory, queryPatientOfachive } = props
  const isEditing = queryPatientOfachive.patient.boundDetails.archivedManagement
  return (<StyledCard
    title={medicalHistoryForPatient ? <StyledCardHeader>
      <p>病史数据</p>
      <Btn
        icon="edit"
        onClick={() => popupEditMedicalHistory(medicalHistoryForPatient)}
        disabled={isEditing}
      >编辑</Btn>
    </StyledCardHeader> : '病史数据'}
  >
    {
      medicalHistoryForPatient ? <MedicalDetails
        medicalHistory={medicalHistoryForPatient}
      /> : <NoDataPage popupEditMedicalHistory={popupEditMedicalHistory} isEditing={isEditing} />
    }
  </StyledCard>)
}
ViewModal.propTypes = {
  data: PropTypes.object.isRequired,
  popupEditMedicalHistory: PropTypes.func.isRequired,
  queryPatientOfachive: PropTypes.func.isRequired,
}

const Btn = styled(Button) `
  margin-top: 10px;
  border: none;
`

export default ViewModal

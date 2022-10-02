
import React from 'react'
import AddPatient from '../../add-patient/containers'

export const popupAddPatient = history =>
  (dispatch) => {
    dispatch({
      type: 'MODAL_SHOW',
      title: '创建新患者',
      isShowModal: true,
      maskClosable: false,
      content: <AddPatient
        history={history}
      />,
      width: 1140,
    })
  }

export const setActivePatient = patientId => ({
  type: 'SET_ACTIVE_PATIENT',
  patientId,
})

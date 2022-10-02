import React from 'react'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import { gql } from 'react-apollo'
import EditModal from '../containers/EditModal'

export const popupAddPhysicalExamination = (lastCreateTime, physicalExamination, age) =>
  (dispatch) => {
    dispatch({
      type: 'MODAL_SHOW',
      title: '编辑查体数据',
      style: {
        top: 20,
        bottom: 20,
        height: 'calc(100vh - 180px)',
      },
      isShowModal: true,
      maskClosable: false,
      content: <EditModal
        lastCreateTime={lastCreateTime}
        physicalExamination={physicalExamination}
        age={age}
      />,
      width: 500,
    })
  }

export const queryPhysicalExaminations = gql`
  query GetPhysicalExaminations(
    $patientId: ID!
  ){
    physicalExaminationsForPatient(patientId: $patientId){

     _id
      patientId
      physicalExaminationTime
      height
      weight
      sitLeftBloodPressure{
        systolic
        diastolic
        pulse
      }
      sitRightBloodPressure{
        systolic
        diastolic
        pulse
      }
      stationLeftBloodPressure{
        systolic
        diastolic
        pulse
      }
      stationRightBloodPressure{
        systolic
        diastolic
        pulse
      }
      waistline
      hipline
      createdAt
    }
  }
  `

export const updatePhysicalExamination = debounce((props, saveClick) => {
  const { form, patientId, closeModal,
    physicalExamination, mutationAddPhysicalExamination, mutationUpdatePhysicalExamination } = props

  form.validateFields((err, fields) => {
    if (err) return
    const {
      physicalExaminationTime,
      height,
      weight,
      sitLeftBloodPressure,
      sitRightBloodPressure,
      stationLeftBloodPressure,
      stationRightBloodPressure,
      waistline,
      hipline,
    } = fields
    let variables = {
      patientId,
      physicalExaminationTime,
      height,
      weight,
      sitLeftBloodPressure,
      sitRightBloodPressure,
      stationLeftBloodPressure,
      stationRightBloodPressure,
      waistline,
      hipline,
    }
    let mutate = mutationAddPhysicalExamination
    saveClick()
    if (!isEmpty(physicalExamination)) {
      variables = {
        physicalExaminationId: physicalExamination._id,
        batch: {
          physicalExaminationTime,
          height,
          weight,
          sitLeftBloodPressure,
          sitRightBloodPressure,
          stationLeftBloodPressure,
          stationRightBloodPressure,
          waistline,
          hipline,
        },
      }
      mutate = mutationUpdatePhysicalExamination
    }
    const refetchQueries = [{
      query: queryPhysicalExaminations,
      variables: {
        patientId,
      },
    }]
    mutate({
      variables,
      refetchQueries,
    }).then(() => {
      closeModal()
    }).catch((e) => {
      console.log(e)
    })
  })
}, 500)

import React from 'react'
import isEmpty from 'lodash/isEmpty'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import moment from 'moment'
import EditModal from '../containers/EditModal'
import { queryMedicalHistory } from './editModal'

export const popupEditMedicalHistory = medicalHistory =>
  (dispatch) => {
    dispatch({
      type: 'MODAL_SHOW',
      title: '编辑病史数据',
      style: {
        top: 20,
        bottom: 20,
        height: 'calc(100vh - 40px)',
        overflowY: 'hidden',
      },
      isShowModal: true,
      maskClosable: false,
      content: <EditModal medicalHistory={medicalHistory} />,
      width: 1030,
    })
  }

const checkGenderAndBirthday = (gender, dateOfBirth) => {
  const age = moment().diff(moment(dateOfBirth), 'years')
  if (gender === 'MALE' && age > 55) {
    return true
  }
  if (gender === 'FEMALE' && age > 65) {
    return true
  }
  return false
}

export const updateMedicalHistory = (props) => {
  const { form, patientId, medicalHistory,
    mutationAddMedicalHistory, closeModal,
    mutationUpdateMedicalHistory, data,
  } = props

  form.validateFields((err, fields) => {
    if (err) return
    const {
      courseOfHypertension,
      highestBloodPressureInClinic,
      hypertensionLevel,
      riskLevel,
      riskFactors,
      targetOrganDamage,
      withClinicalIllness,
      antihypertensiveDrugsContraindications,
      otherMedicalHistory,
      isMedical,
      isAllergy,
      allergyHistory,
      familyHistory,
    } = fields
    let mergeRiskFactors = riskFactors
    const gender = get(data, 'patient.boundDetails.gender')
    const dateOfBirth = get(data, 'patient.boundDetails.dateOfBirth')
    if (checkGenderAndBirthday(gender, dateOfBirth) && riskFactors) {
      mergeRiskFactors = uniqWith(
        [
          ...riskFactors,
          'FIFTY_FIVE_FOR_MALE_SIXTY_FIVE_FOR_FEMALE',
        ],
        isEqual)
    }
    const transforFamilyHistory = {}
    if (!isEmpty(familyHistory)) {
      Object.keys(familyHistory).forEach((property) => {
        if (!isEmpty(familyHistory[property]) && familyHistory[property].isFlag) {
          const tempObj = {}
          tempObj.historyCategory = familyHistory[property].options
          tempObj.comments = familyHistory[property].comments
          transforFamilyHistory[property] = tempObj
        }
      })
    }
    const { year } = courseOfHypertension
    const formatCOH = `${year}-01-01`
    const optionDetails = {
      riskFactors: mergeRiskFactors,
      targetOrganDamage,
      withClinicalIllness,
      antihypertensiveDrugsContraindications,
      otherMedicalHistory,
      isMedical,
      isAllergy,
      allergyHistory,
      familyHistory: transforFamilyHistory,
    }
    let variables = {
      patientId,
      courseOfHypertension: formatCOH,
      highestBloodPressureInClinic,
      conclusion: {
        hypertensionLevel,
        riskLevel,
      },
      optionDetails,
    }
    let mutate = mutationAddMedicalHistory
    if (!isEmpty(medicalHistory)) {
      variables = {
        medicalHistoryId: medicalHistory._id,
        batch: {
          courseOfHypertension: formatCOH,
          highestBloodPressureInClinic,
          conclusion: {
            hypertensionLevel,
            riskLevel,
          },
          optionDetails,
        },
      }
      mutate = mutationUpdateMedicalHistory
    }
    const refetchQueries = [{
      query: queryMedicalHistory,
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
}

import React from 'react'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import Moment from 'moment'
import EditModal from '../containers/EditModal'
import { queryMedicalHistory, queryCaseRecords } from './editModal'
import { getMedicines } from './common'

export const popupEditCaseRecord = (caseRecord, activeTab) => (dispatch) => {
  dispatch({
    type: 'MODAL_SHOW',
    title: '编辑病历数据',
    style: {
      top: 20,
      bottom: 20,
      height: 'calc(100vh - 40px)',
      overflowY: 'hidden',
    },
    isShowModal: true,
    maskClosable: false,
    content: <EditModal caseRecord={caseRecord} activeTab={activeTab} />,
    width: 600,
  })
}

export const updateMedicalHistory = (props) => {
  const {
    form,
    patientId,
    medicalHistory,
    mutationAddMedicalHistory,
    closeModal,
    mutationUpdateMedicalHistory,
  } = props

  form.validateFields((err, fields) => {
    // console.log(err, fields)
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
    const optionDetails = {
      riskFactors,
      targetOrganDamage,
      withClinicalIllness,
      antihypertensiveDrugsContraindications,
      otherMedicalHistory,
      allergyHistory,
      isMedical,
      isAllergy,
      familyHistory: transforFamilyHistory,
    }
    let variables = {
      patientId,
      courseOfHypertension,
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
          courseOfHypertension,
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
    const refetchQueries = [
      {
        query: queryMedicalHistory,
        variables: {
          patientId,
        },
      },
    ]
    mutate({
      variables,
      refetchQueries,
    })
      .then(() => {
        closeModal()
      })
      .catch((e) => {
        console.log(e)
      })
  })
}

export const createCaseRecord = debounce(
  (props, isFirstTimeAddMedicines, previousMedicines, medicines, caseRecordId, saveClick) => {
    // const { form, patientId, closeModal } = props
    // saveClick()
    const {
      form,
      mutationAddCaseRecord,
      closeModal,
      patientId,
      mutationUpdateCaseRecord,
      mutationUpdateBPSafeRange,
    } = props
    // 表单验证
    form.validateFields((err, fields) => {
      if (err) {
        saveClick(false)
        return
      }
      // 取到表单里面需要上传的值
      const {
        bodyCheckup,
        diagnosis,
        laboratoryTests,
        patientDesc,
        caseRecordDate,
        targetBP,
        noteMessage,
        reviewTime,
      } = fields
      let newTargetBP = {}
      if (targetBP) {
        newTargetBP = {
          HP: [targetBP.HighSmall, targetBP.HighLarge],
          LP: [targetBP.LowSmall, targetBP.LowLarge],
        }
      }
      const mutateBP = mutationUpdateBPSafeRange
      mutateBP({
        variables: {
          _id: patientId,
          boundDetails: {
            safeRangeSystolicBloodPressure: `${targetBP.HighSmall},${targetBP.HighLarge}`,
            safeRangeDiastolicBloodPressure: `${targetBP.LowSmall},${targetBP.LowLarge}`,
          },
        },
      })

      const prescription = {
        medicines: getMedicines(isFirstTimeAddMedicines, previousMedicines, medicines),
      }
      let mutate = mutationAddCaseRecord
      let variables = {
        patientId,
        bodyCheckup,
        diagnosis,
        laboratoryTests,
        patientDesc,
        prescription,
        caseRecordDate: `${new Moment(caseRecordDate).format('YYYY-MM-DD')}T00:00:00.000Z`,
        targetBP: newTargetBP,
        noteMessage,
        reviewTime,
      }
      if (caseRecordId) {
        mutate = mutationUpdateCaseRecord
        // variables.caseRecordId = caseRecordId
        variables = {
          caseRecordId,
          batch: {
            bodyCheckup,
            diagnosis,
            laboratoryTests,
            patientDesc,
            prescription,
            caseRecordDate: `${new Moment(caseRecordDate).format('YYYY-MM-DD')}T00:00:00.000Z`,
            targetBP: newTargetBP,
            noteMessage,
            reviewTime,
          },
        }
      }
      const refetchQueries = [
        {
          query: queryCaseRecords,
          variables: {
            patientId,
          },
        },
      ]

      mutate({ variables, refetchQueries })
        .then(() => {
          closeModal()
        })
        .catch((e) => {
          console.log(e)
        })
    })
  },
  500,
)

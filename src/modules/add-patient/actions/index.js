import { gql } from 'react-apollo'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import queryPatients from '../../patient/actions/patientList'
import queryPatientById from '../../patient/actions/profile'

export const mutationAddPatient = gql`
  mutation SignUpPatientAsHealthCareProfessional(
    $fullName: String!
    $mobile: PhoneNumber!
    $boundDetails: BoundDetailsInput!
  ) {
    signUpPatientAsHealthCareProfessional(
      fullName: $fullName
      mobile: $mobile
      boundDetails: $boundDetails
    ) {
      _id
      fullName
      avatar
      boundDetails {
        gender
        dateOfBirth
        hypertensionLevel
        isStarred
      }
    }
  }
`

export const mutationUpdatePatient = gql`
  mutation UpdatePatientAsHealthCareProfessional(
    $_id: ID!
    $fullName: String!
    $mobile: PhoneNumber!
    $boundDetails: BoundDetailsInput!
  ) {
    updatePatientAsHealthCareProfessional(
      _id: $_id
      fullName: $fullName
      mobile: $mobile
      boundDetails: $boundDetails
    ) {
      _id
      fullName
      avatar
    }
  }
`

export const isExistMobileNumber = gql`
query patientByMobile(
  $mobileNumber:String!
){
  patientByMobile(
    mobileNumber:$mobileNumber
  ){
    _id
  }
}
`

export const getInfoAndAddPatient = (props) => {
  const { form, closeModal, patientInfo, history, togglePatientSider } = props
  form.validateFields((err, fields) => {
    if (err) return

    const { fullName, mobile, dateOfBirth,
      permanentPlaceOfRecidence,
      emergencyContact,
      averageMonthlyFamilyIncome,
      healthInsuranceType,
      highestEducationLevel,
      measurementDeviceStatus,
    } = fields
    const { code, prefix, addressDetail } = permanentPlaceOfRecidence
    console.log(permanentPlaceOfRecidence, '=-=')
    const prefixs = prefix ? prefix.split('/') : []
    const omitFields = ['fullName', 'mobile', 'dateOfBirth', 'avatar', 'averageMonthlyFamilyIncome', 'healthInsuranceType', 'highestEducationLevel', 'measurementDeviceStatus']
    // if (!idCard) {
    //   omitFields.push('idCard')
    // }
    const emergencyContactTemp = {}
    Object.keys(emergencyContact).forEach((key) => {
      if (emergencyContact[key]) {
        emergencyContactTemp[key] = emergencyContact[key]
      }
    })
    const boundDetails = {
      ...omit(fields, omitFields),
      permanentPlaceOfRecidence: {
        province: prefixs[0],
        municipality: prefixs[1],
        area: prefixs[2],
        provinceCode: code[0],
        municipalityCode: code[1] || '',
        areaCode: code[code.length - 1] || '',
        addressDetail,
      },
      emergencyContact: emergencyContactTemp,
    }
    if (averageMonthlyFamilyIncome) {
      boundDetails.averageMonthlyFamilyIncome = averageMonthlyFamilyIncome
    }
    if (healthInsuranceType) {
      boundDetails.healthInsuranceType = healthInsuranceType
    }
    if (highestEducationLevel) {
      boundDetails.highestEducationLevel = highestEducationLevel
    }
    if (measurementDeviceStatus) {
      boundDetails.measurementDeviceStatus = measurementDeviceStatus
    }
    if (dateOfBirth) {
      if (dateOfBirth.year && dateOfBirth.month && dateOfBirth.day) {
        boundDetails.dateOfBirth = `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`
      }
    }
    const variables = {
      fullName,
      mobile,
      boundDetails,
    }
    let mutate = props.mutationAddPatient
    let refetchQueries = [{ query: queryPatients }]
    if (!isEmpty(patientInfo)) {
      mutate = props.mutationUpdatePatient
      variables._id = patientInfo._id
      refetchQueries = [
        {
          query: queryPatientById,
          variables: {
            patientId: patientInfo._id,
          },
        },
      ]
    }
    mutate({
      variables,
      refetchQueries,
    }).then((result) => {
      closeModal()
      if (isEmpty(patientInfo)) {
        togglePatientSider()
        if (history) history.push(`/patient/${result.data.signUpPatientAsHealthCareProfessional._id}/blood-pressure`)
      }
    })
  })
}

export const isNumber = (value, expectLen) => {
  const reg = /^\d+$/
  let flag = false
  const isLength = !expectLen || (expectLen && (value && value.length === expectLen))
  if (value === '' || (!isNaN(value) && reg.test(value) && isLength)) {
    flag = true
  }
  return flag
}

export const isWeightNumber = (val) => {
  const regPos = /^\d+(\.\d+)?$/
  const regNeg = / ^\d+$/
  let flag = false
  if (regPos.test(val) || regNeg.test(val)) {
    flag = true
  }
  return flag
}

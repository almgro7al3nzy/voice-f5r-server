import isEmpty from 'lodash/isEmpty'
import { gql } from 'react-apollo'
import moment from 'moment'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'

const isBetween = (value, min, max) => value >= min && value <= max

const getValue = value => !isEmpty(value)

const isHighBPInClinic = ({ systolic, diastolic }) => (systolic >= 180 || diastolic >= 110)
const isMidBPInClinic = ({ systolic, diastolic }) =>
  (isBetween(systolic, 160, 179) || isBetween(diastolic, 100, 109))
const isLow = ({ systolic, diastolic }) =>
  (isBetween(systolic, 140, 159) || isBetween(diastolic, 90, 99))

const getHypertensionLevel = (highestBloodPressureInClinic = {}) => {
  let hypertensionLevel = 'LEVEL_1'
  if (isHighBPInClinic(highestBloodPressureInClinic)) {
    hypertensionLevel = 'LEVEL_3'
  } else if (isMidBPInClinic(highestBloodPressureInClinic)) {
    hypertensionLevel = 'LEVEL_2'
  } else if (isLow(highestBloodPressureInClinic)) {
    hypertensionLevel = 'LEVEL_1'
  }
  return hypertensionLevel
}

const isExtremelyHigh = ({
  withClinicalIllness, highestBloodPressureInClinic,
  riskFactors, targetOrganDamage,
}) => {
  const hasClinicalIllness = getValue(withClinicalIllness)
  const hasRiskFactors = getValue(riskFactors)
  const hasTargetOrganDamage = getValue(targetOrganDamage)
  const hasHighBPInClinic = isHighBPInClinic(highestBloodPressureInClinic)
  return hasClinicalIllness || ((hasRiskFactors || hasTargetOrganDamage) && hasHighBPInClinic)
}

const isHigh = ({
  riskFactors, highestBloodPressureInClinic, targetOrganDamage,
}) => {
  const moreThen3RiskFactors = !isEmpty(riskFactors) && (riskFactors.length >= 3)
  const hasTargetOrganDamage = getValue(targetOrganDamage)
  const hasHighBPInClinic = isHighBPInClinic(highestBloodPressureInClinic)
  return hasHighBPInClinic || ((moreThen3RiskFactors || hasTargetOrganDamage) && !hasHighBPInClinic)
}

const isMid = ({
  riskFactors, highestBloodPressureInClinic,
}) => {
  const oneOrTwoRiskFactors = !isEmpty(riskFactors) && isBetween(riskFactors.length, 1, 2)
  const hasMidBPInClinic = isMidBPInClinic(highestBloodPressureInClinic)
  const hasHighBPInClinic = isHighBPInClinic(highestBloodPressureInClinic)
  return hasMidBPInClinic || (oneOrTwoRiskFactors && !hasHighBPInClinic)
}

const getPropertyValue = (value, type, currentType, getFieldValue) =>
  type === currentType ? value : getFieldValue(type)

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

export const handlecheckChange = (value, type, props) => {
  const {
    form: { getFieldValue, setFieldsValue },
    data: { patient: { boundDetails: { dateOfBirth, gender } } },
  } = props
  let riskFactors = getPropertyValue(value, 'riskFactors', type, getFieldValue) || []
  if (checkGenderAndBirthday(gender, dateOfBirth) && riskFactors) {
    riskFactors = uniqWith(
      [
        ...riskFactors,
        'FIFTY_FIVE_FOR_MALE_SIXTY_FIVE_FOR_FEMALE',
      ],
      isEqual)
  }
  const targetOrganDamage = getPropertyValue(value, 'targetOrganDamage', type, getFieldValue)
  const withClinicalIllness = getPropertyValue(value, 'withClinicalIllness', type, getFieldValue)
  const systolic = getPropertyValue(value, 'highestBloodPressureInClinic.systolic', type, getFieldValue)
  const diastolic = getPropertyValue(value, 'highestBloodPressureInClinic.diastolic', type, getFieldValue)
  const highestBloodPressureInClinic = { systolic, diastolic }
  let riskLevel = 'LOW'
  const defaultParams = {
    withClinicalIllness,
    highestBloodPressureInClinic,
    riskFactors,
    targetOrganDamage,
  }
  if (isExtremelyHigh(defaultParams)) {
    riskLevel = 'EXTREMELY_HIGH'
  } else if (isHigh(defaultParams)) {
    riskLevel = 'HIGH'
  } else if (isMid(defaultParams)) {
    riskLevel = 'MID'
  } else if (isLow(highestBloodPressureInClinic)) {
    riskLevel = 'LOW'
  }
  const currentRiskLevel = getFieldValue('riskLevel')
  if (currentRiskLevel !== riskLevel) {
    setFieldsValue({
      riskLevel,
    })
  }
  if (/highestBloodPressureInClinic/.test(type)) {
    const currentHyperLevel = getFieldValue('hypertensionLevel')
    const hypertensionLevel = getHypertensionLevel(highestBloodPressureInClinic)
    if (currentHyperLevel !== hypertensionLevel) {
      setFieldsValue({
        hypertensionLevel,
      })
    }
  }
}

export const getCheckboxConfig = () => [
  { type: 'riskFactors' },
  { type: 'targetOrganDamage' },
  { type: 'withClinicalIllness' },
  { type: 'antihypertensiveDrugsContraindications' },
]

export const mutationAddMedicalHistory = gql`
  mutation AddMedicalHistory(
    $patientId: ID!
    $courseOfHypertension: Day!
    $highestBloodPressureInClinic: HighestBloodPressureInClinicInput!
    $optionDetails: OptionDetailsInput
    $conclusion: ConclusionInput!
  ) {
    addMedicalHistory(
      patientId: $patientId,
      courseOfHypertension: $courseOfHypertension,
      highestBloodPressureInClinic: $highestBloodPressureInClinic,
      optionDetails: $optionDetails,
      conclusion: $conclusion,
    ) {
      _id
      courseOfHypertension
    }
  }
`
export const mutationUpdateMedicalHistory = gql`
  mutation UpdateMedicalHistory(
    $medicalHistoryId: ID!
    $batch: BatchInput!
  ) {
    updateMedicalHistory(
      medicalHistoryId: $medicalHistoryId,
      batch: $batch,
    )
  }
`
export const queryMedicalHistory = gql`
  query GetMedicalHistory(
    $patientId: ID!
  ){
    medicalHistoryForPatient(patientId: $patientId) {
      _id
      courseOfHypertension
      highestBloodPressureInClinic {
        systolic
        diastolic
      }
      conclusion {
        riskLevel
        hypertensionLevel
      }
      riskFactors
      targetOrganDamage
      withClinicalIllness
      antihypertensiveDrugsContraindications
      otherMedicalHistory
      allergyHistory
      isMedical
      isAllergy
      familyHistory {
        mother {
          comments
          historyCategory
        }
        father {
          comments
          historyCategory
        }
        child {
          comments
          historyCategory
        }
        sibling {
          comments
          historyCategory
        }
      }
    }
  }
`

export const queryPatientById = gql`
  query queryPatientById($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      boundDetails {
        gender
        dateOfBirth
        archivedManagement
      }
    }
  }
`

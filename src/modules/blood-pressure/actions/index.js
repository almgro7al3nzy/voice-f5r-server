import React from 'react'
import { gql } from 'react-apollo'
import ShowBPInfoPicture from '../components/ShowBPInfoPicture.js'

export * from './bp-measure-module'
export const queryhistory = gql`
  query GetAllPatientsForBD($id: ID!, $before: Date, $after: Date, $limit: Int) {
    me {
      _id
      ... on HealthCareProfessional {
        healthCareTeams {
          ... on HealthCareTeam {
            patient(id: $id) {
              fullName
              _id
              boundDetails {
                safeRangeSystolicBloodPressure
                safeRangeDiastolicBloodPressure
              }
              medicinesCondition(after: $after, limit: $limit){
                caseRecordDate
                diagnosis {
                  description
                }
                prescription {
                  medicines {
                    name
                    dosage
                    usage
                  }
                }
              }
              bloodPressureMeasurements(before: $before, after: $after, limit: $limit) {
                systolic
                diastolic
                heartRate
                measuredAt
                manualAddition
                measurementContext
                location {
                  province
                  city
                }
              }
            }
          }
        }
      }
    }
  }
`

export const queryBPHistory = gql`
  query GetPatientBPHistory($id: ID!, $after: String) {
    me {
      _id
      ... on HealthCareProfessional {
        healthCareTeams {
          ... on HealthCareTeam {
            patientHistoryForBD(id: $id, after: $after) {
              PatientInfo {
                fullName
                _id
                boundDetails {
                  safeRangeSystolicBloodPressure
                  safeRangeDiastolicBloodPressure
                  riskLevel
                  hypertensionLevel
                  bpStandardPerFollowUp
                  isFollowUpCreated
                }
              }
              BPHistory {
                _id
                systolic
                diastolic
                heartRate
                measuredAt
                measurementContext
                describleContent
                manualAddition
                location {
                  province
                  city
                }
              }
              OverproofTypes {
                overproofType
              }
            }
          }
        }
      }
    }
  }
`
export const queryFollowUp = gql`
  query GetFollowUpForBP($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      BPLevelProfileDateRange {
        startAt
        endAt
      }
    }
  }
`

export const updateSafeRange = gql`
  mutation updateSafeRange($_id: ID!, $boundDetails: BoundDetailsSafeRange!) {
    updatePatientSafeBloodPressureRange(_id: $_id, boundDetails: $boundDetails) {
      _id
      boundDetails {
        safeRangeSystolicBloodPressure
        safeRangeDiastolicBloodPressure
      }
    }
  }
`
export const queryPatientById = gql`
  query queryPatientById($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      boundDetails {
        archivedManagement
      }
    }
  }
`

export const updatePatient = (SafeRange,
  systolicRangeValue, diastolicRangeValue, patientId) => {
  const boundDetails = {}
  boundDetails.safeRangeSystolicBloodPressure = systolicRangeValue.join(',')
  boundDetails.safeRangeDiastolicBloodPressure = diastolicRangeValue.join(',')
  const variables = {
    boundDetails,
  }
  const mutate = SafeRange
  variables._id = patientId
  mutate({ variables })
}

export const ShowInfoPicture = (choose, PId, BtnClick) => (dispatch) => {
  dispatch({
    type: 'MODAL_SHOW',
    title: null,
    style: {
      top: 20,
      bottom: 20,
      overflowY: 'hidden',
    },
    isShowModal: true,
    content: <ShowBPInfoPicture
      choose={choose}
      PId={PId}
      BtnClick={BtnClick}
    />,
    width: '100%',
  })
}

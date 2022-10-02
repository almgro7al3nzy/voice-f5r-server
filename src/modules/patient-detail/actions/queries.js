import { gql } from 'react-apollo'

export const getPatientInfo = gql`
  query GetPatientInfo($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      boundDetails {
        safeRangeSystolicBloodPressure
        safeRangeDiastolicBloodPressure
        riskLevel
        hypertensionLevel
        bpStandardPerFollowUp
        isFollowUpCreated
        groupStatus{
          type
          changeTime
          compareLast
          existFrist
        }
      }
      BPLevelProfileDateRange {
        startAt
        endAt
      }
      medicinesCondition {
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
    }
  }
`
export const getPatientFollowUpCondition = gql`
  query GetPatientFollowUpCondition($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      followUpCondition {
        overdueFollowedCount
        followedCount
        period
        nextFollowUp
      }
    }
  }
`

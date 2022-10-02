import { gql } from 'react-apollo'

export const getFollowUpAndSoapsForPatient = gql`
  query patient($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      availableFollowUps {
        endAt
        period
      }
      needFollowUpNow
      medicalHistoryExists
      currentDayCaseRecord {
        patientDesc {
          description
        }
        bodyCheckup {
          description
        }
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
      soaps {
        _id
        overdue
        subjective
        objective
        assessment
        plan
        communicateWay
        severity {
          medicine
          monitor
          diet
          solution
          sports
          healthAdjustment
          reduceRisk
        }
        phoneFollowUpAt
        createdAt
        createdBy {
          fullName
          role
        }
      }
    }
  }
`

export const getSoapCorpus = gql`
  query corpus {
    soapCorpus {
      _id
      category
      segment
      dependence
      value
      createdBy {
        _id
      }
      createdAt
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
export const queryLoginRole = gql`
  query GetAllHealthCareProfessional {
    me {
      _id
      ... on HealthCareProfessional {
        fullName
        healthCareTeams {
          healthCareProfessionals {
            _id
            fullName
            mobile
            role
          }
        }
      }
    }
  }
`

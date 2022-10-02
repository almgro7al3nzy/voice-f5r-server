import { gql } from 'react-apollo'

const queryPatients = gql`
  query GetAllPatients {
    me {
      _id
      ... on HealthCareProfessional {
        healthCareTeams {
          ... on HealthCareTeam {
            patients {
              ... on Patient {
                _id
                fullName
                avatar
                mobile
                createdAt
                boundDetails {
                  gender
                  dateOfBirth
                  hypertensionLevel
                  isStarred
                  archivedManagement
                }
              }
            }
          }
        }
      }
    }
  }
`
export default queryPatients

import { gql } from 'react-apollo'

export const queryFollowUps = gql`
  query GetFollowUps($overdueFlag: Boolean) {
    me {
      ... on HealthCareProfessional {
        _id
        followUps(overdueFlag: $overdueFlag) {
          _id
          status
          surplusDays
          followupDates
          patient {
            _id
            fullName
            mobile
            boundDetails{
              archivedManagement
            }
          }
        }
      }
    }
  }
`
export const queryUnmeasurement = gql`
  query GetUnmeasurement {
    me {
      ... on HealthCareProfessional {
        _id
        unmeasurePatients {
          patient {
            _id
            fullName
            mobile
            boundDetails{
              archivedManagement
            }
          }
          status
          surplusDays
        }
      }
    }
  }
`

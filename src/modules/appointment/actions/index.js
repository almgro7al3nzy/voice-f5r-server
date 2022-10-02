import { gql } from 'react-apollo'

export * from './mutations'

export const getAppointments = gql`
  query GetAppointments($selectedDay: Day) {
    me {
      _id
      ... on HealthCareProfessional {
        healthCareTeams {
          appointments(selectedDay: $selectedDay){
            _id
            patient {
              _id
              fullName
              mobile
              boundDetails {
                HISNumber
                archivedManagement
              }
            }
            appointmentState
            status
            source
            note
            appointmentTime
          }
        }
      }
    }
  }
`

export const getOrderedAptDays = gql`
  query GetOrderedAptDays {
    me {
      _id
      ... on HealthCareProfessional {
        healthCareTeams {
          orderedAptDays
        }
      }
    }
  }
`

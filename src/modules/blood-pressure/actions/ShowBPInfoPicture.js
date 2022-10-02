import { gql } from 'react-apollo'

export const queryChartHistory = gql`
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
                createdAt
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

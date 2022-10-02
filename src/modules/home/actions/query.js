import { gql } from 'react-apollo'

export const queryOverproof = gql`
  query GetAllOverproof ($after: Date){
    me {
      _id
      ... on HealthCareProfessional {
        healthCareTeams {
          ... on HealthCareTeam {
            overproofPatients (after: $after){
              ... on OverproofPatient {
                _id
                patientId
                handleResult
                systolic
                diastolic
                measuredAt
                unHandleCount
                state
              }
            }
            patients {
              ... on Patient {
                _id
                fullName
                mobile
              }
            }
          }
        }
      }
    }
  }`

export const updateOverproofPatient = gql`
  mutation updateOverproofPatient(
    $_id: ID!
    $handleResult: String!
    $state: Boolean!
  ) {
    updateOverproofPatient(
      _id: $_id,
      handleResult: $handleResult,
      state: $state,
    ) {
        _id
        handleResult
        state
      }
    }`

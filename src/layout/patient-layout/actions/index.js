
import { gql } from 'react-apollo'

export const queryPatientById = gql`
  query queryPatientById($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      boundDetails {
        archivedManagement
        groupStatus{
          type
          changeTime
          compareLast
        }
      }
    }
  }
`
export const mutationUpdateTheFileManger = gql`
  mutation UpdateTheFileManger(
    $patientId:ID!
  ){
    updateTheFileManger(
      patientId: $patientId,
    )
  }
`

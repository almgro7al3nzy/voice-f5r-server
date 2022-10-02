import { gql } from 'react-apollo'

export const mutationAddSoap = gql`
  mutation addSoap(
    $patientId: String!
    $overdue: Boolean!
    $subjective: String!
    $objective: String!
    $assessment: String!
    $plan: String!
    $severity: SeverityInput!
    $phoneFollowUpAt: Date!
    $communicateWay:String
  ) {
    addSoap(
      patientId: $patientId
      overdue: $overdue
      subjective: $subjective
      objective: $objective
      assessment: $assessment
      plan: $plan
      severity: $severity
      communicateWay:$communicateWay
      phoneFollowUpAt: $phoneFollowUpAt
    ) {
      _id
    }
  }
`

export const mutationUpdateSoap = gql`
  mutation updateSoap(
    $_id: ID!
    $subjective: String!
    $objective: String!
    $assessment: String!
    $plan: String!
    $severity: SeverityInput!
    $phoneFollowUpAt: Date!
    $communicateWay:String
  ) {
    updateSoap(
      _id: $_id
      subjective: $subjective
      objective: $objective
      assessment: $assessment
      plan: $plan
      severity: $severity
      communicateWay:$communicateWay
      phoneFollowUpAt: $phoneFollowUpAt
    ) {
      _id
    }
  }
`

export const mutationAddSoapCorpus = gql`
  mutation addSoapCorpus(
    $category: SoapCategory!
    $segment: SoapSegment!
    $dependence: ID
    $value: String!
  ) {
    addSoapCorpus(category: $category, segment: $segment, dependence: $dependence, value: $value) {
      _id
    }
  }
`

export const mutationRemoveSoapCorpus = gql`
  mutation removeSoapCorpus($_id: ID!) {
    removeSoapCorpus(_id: $_id)
  }
`

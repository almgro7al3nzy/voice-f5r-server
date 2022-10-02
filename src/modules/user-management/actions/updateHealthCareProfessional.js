import { gql } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import { queryAllHealthCareProfessional } from './'

export const queryHealthCareTeams = gql`
  query GetHealthCareTeams {
    me {
      _id
      ... on HealthCareProfessional {
        fullName
        healthCareTeams {
          institution {
            name
            healthCareTeams {
              leaderOfHealthCareTeam {
                fullName
                role
                healthCareTeamId
              }
            }
          }
        }
      }
    }
  }
`

export const mutationAddHealthCareProfessional = gql`
  mutation SignUpHealthCareProfessional (
    $batchHealthCareProfessional: BatchHealthCareProfessional!
  ) {
    signUpHealthCareProfessional(
      batchHealthCareProfessional: $batchHealthCareProfessional
    ){
      _id
    }
  }
`
export const mutationUpdateHealthCareProfessional = gql`
  mutation UpdateHealthCareProfessional (
    $batchUpdateHealthCareProfessional: BatchUpdateHealthCareProfessional!
    $healthCareProfessionalId: ID!
  ) {
    updateHealthCareProfessional(
      batchUpdateHealthCareProfessional: $batchUpdateHealthCareProfessional,
      healthCareProfessionalId: $healthCareProfessionalId
    )
  }
`
export const updateHealthCareProfessional = (props) => {
  const { form, closeModal, healthCareProfessional } = props
  form.validateFields((err, fields) => {
    if (err) return

    const batchHealthCareProfessional = {
      ...pick(fields, [
        'fullName', 'mobile', 'role',
        'department', 'healthCareTeamId',
      ]),
    }
    let variables = {
      batchHealthCareProfessional,
    }
    const refetchQueries = [{ query: queryAllHealthCareProfessional }]
    let mutate = props.mutationAddHealthCareProfessional
    if (!isEmpty(healthCareProfessional)) {
      variables = {
        batchUpdateHealthCareProfessional: batchHealthCareProfessional,
        healthCareProfessionalId: healthCareProfessional._id,
      }
      mutate = props.mutationUpdateHealthCareProfessional
    }
    mutate({
      variables,
      refetchQueries,
    }).then(() => {
      closeModal()
    })
  })
}

export const updateAvatarForHealthCareProfessional = gql`
  mutation updateAvatarForHealthCareProfessional(
    $avatarImageData: String!
  ) {
    updateAvatar(avatarImageData: $avatarImageData) {
      avatar
    }
  }
`

export const updateAvatar = avatarImageData => ({
  type: 'UPDATE_PATIENT_AVATAR',
  avatar: avatarImageData,
})

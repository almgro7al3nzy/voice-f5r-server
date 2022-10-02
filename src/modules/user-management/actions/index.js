import React from 'react'
import { gql } from 'react-apollo'
import UpdateHealthCareProfessional from '../containers/UpdateHealthCareProfessional'

export const resetStore = () => (dispatch) => {
  dispatch({ type: 'RESET' })
}

export const popupUpdateHealthCareProfessional = healthCareProfessional => (dispatch) => {
  dispatch({
    type: 'MODAL_SHOW',
    title: '创建新用户',
    isShowModal: true,
    content: <UpdateHealthCareProfessional healthCareProfessional={healthCareProfessional} />,
    width: 600,
    maskClosable: false,
  })
}

export const queryAllHealthCareProfessional = gql`
  query GetAllHealthCareProfessional {
    me {
      _id
      ... on HealthCareProfessional {
        fullName
        healthCareTeams {
          institution {
            name
            healthCareTeams {
              healthCareProfessionals {
                _id
                fullName
                role
                mobile
                department
              }
            }
          }
        }
      }
    }
  }
`

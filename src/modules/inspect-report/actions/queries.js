import React from 'react'
import { gql } from 'react-apollo'

export const queryInspectReportById = gql`
  query queryInspectReportById($patientId: ID!, $queryType: String) {
    patient(patientId: $patientId) {
      _id
      inspectReports(queryType: $queryType) {
        _id
        type
        patientId
        imageList {
          key
          images {
            _id
            imageUrl
          }
        }
        inspectedAt
        createdAt
      }
    }
  }
`

export const openImage = imageUrl => ({
  type: 'MODAL_SHOW',
  isShowModal: true,
  width: 'unset',
  content: <img alt="img" style={{ width: '100%' }} src={imageUrl} />,
})

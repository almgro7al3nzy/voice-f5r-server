import { gql } from 'react-apollo'
import React from 'react'
import { DatePicker } from 'antd'

export const mutationAddInspectReport = gql`
  mutation addInspectReport(
    $patientId: ID!
    $type: String!
    $inspectedAt: String!
    $base64EncodedImageData: String!
  ) {
    addInspectReport(
    patientId: $patientId,
    type: $type,
    inspectedAt: $inspectedAt,
    base64EncodedImageData: $base64EncodedImageData
  ) {
      _id
    }
  }
`

export const mutationRemoveInspectReport = gql`
  mutation removeInspectReport(
    $patientId: ID
    $inspectId: ID
    $inspectedAt: String
  ) {
    removeInspectReport(
      patientId: $patientId,
      inspectId: $inspectId,
      inspectedAt: $inspectedAt,
    )
  }
`

export const popupSelectDatePicker = dateSelect => (dispatch) => {
  dispatch({
    type: 'MODAL_SHOW',
    title: '选择检验报告时间',
    style: {
      top: 20,
      bottom: 20,
      height: 'calc(100vh - 40px)',
      overflowY: 'hidden',
    },
    isShowModal: true,
    maskClosable: false,
    content: <DatePicker
      style={{ width: '230px' }}
      placeholder="请选择检验报告日期"
      onChange={dateSelect}
    />,
    width: 600,
  })
}

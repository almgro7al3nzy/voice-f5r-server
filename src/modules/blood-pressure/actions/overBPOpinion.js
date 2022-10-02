import { gql } from 'react-apollo'
import React from 'react'
import OverBPOptionBtn from '../components/OverBPOptionBtn.js'

export const mutationAddTheBPDescrible = gql`
  mutation AddTheBPDescrible(
    $patientId:ID!
    $_id:[String!]
    $describleContent:String!
  ){
    addTheBPDescrible(
      patientId: $patientId,
      _id: $_id,
      describleContent:$describleContent,
    )
  }
`
export const overBPOpinion = (checkOutArray, row, patiientInfo, clearTheArray) =>
  (dispatch) => {
    dispatch({
      type: 'MODAL_SHOW',
      title: <div><span>编辑异常处理意见</span>
        <span style={{ fontSize: 12, color: 'gray' }}>{`已选中了${checkOutArray.length > 0 ? checkOutArray.length : '1'}条数据`}
        </span>
      </div>,
      isShowModal: true,
      maskClosable: false,
      width: 460,
      content: <OverBPOptionBtn
        checkOutArray={checkOutArray}
        row={row}
        patiientInfo={patiientInfo}
        clearTheArray={clearTheArray}
      />,
    })
  }

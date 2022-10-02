import React from 'react'
import moment from 'moment'
import get from 'lodash/get'
// import EditModal from '../containers/EditModal'
// import RiskEditModal from '../../risk-categories/components/EditModal'

export const popupEditSoap = content => (dispatch) => {
  const createdAt = get(content, 'props.soap.createdAt')
  const timeDiff = moment().diff(moment(createdAt), 'hours')
  if (timeDiff > 24) {
    dispatch({
      type: 'MODAL_SHOW',
      title: 'SOAP记录',
      isShowModal: true,
      maskClosable: false,
      content: <h3>创建已经超过24小时，不可以再次进行编辑，如有需要请重新创建SOAP</h3>,
    })
  } else {
    dispatch({
      type: 'MODAL_SHOW',
      title: 'SOAP记录',
      style: {
        height: '740px',
      },
      isShowModal: true,
      maskClosable: false,
      content,
      width: 1030,
    })
  }
}

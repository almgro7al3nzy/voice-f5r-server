import React, { PropTypes } from 'react'
import { Modal, Button } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'

const Layout = ({ modal, closeModal }) => {
  const actionBtns = []
  if (get(modal, 'cancel')) {
    actionBtns.push(
      <Button
        onClick={modal.cancel.fn || closeModal}
      >{modal.cancel.label}</Button>,
    )
  }
  if (get(modal, 'save')) {
    actionBtns.push(
      <Button
        onClick={modal.save.fn}
        type="primary"
        icon="save"
      >{modal.save.label}</Button>,
    )
  }
  if (get(modal, 'btns')) {
    modal.btns.forEach((element) => {
      actionBtns.push(
        <Button
          onClick={element.fn}
        >{element.label}</Button>,
      )
    })
  }
  return (
    <ModalWithStyle
      visible={modal.isShowModal}
      title={modal.title}
      onCancel={closeModal}
      footer={actionBtns.length ? <FooterContainer>{actionBtns}</FooterContainer> : null}
      width={modal.width}
      maskClosable={modal.maskClosable}
      {...modal}
    >
      {modal.content}
    </ModalWithStyle>
  )
}

Layout.propTypes = {
  modal: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
}

const FooterContainer = styled.div`
  padding: 10px 30px;
`
const ModalWithStyle = styled(Modal)`
  max-width: calc(100vw - 100px);
  .ant-modal-header {
    margin: 0px 16px;
  }
`
export default Layout

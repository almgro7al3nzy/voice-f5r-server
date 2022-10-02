import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'
import { popupEditMedicalHistory } from './actions'
import ViewModal from './containers/ViewModal'

const MedicalHistory = props => (<Card title="病史数据">
  <div>患者尚未有病史</div>
  <Button
    type="primary"
    icon="file-add"
    onClick={props.popupEditMedicalHistory}
  >新病史</Button>
  <ViewModal />
</Card>)

MedicalHistory.propTypes = {
  popupEditMedicalHistory: PropTypes.func,
}

export default connect(null, { popupEditMedicalHistory })(MedicalHistory)

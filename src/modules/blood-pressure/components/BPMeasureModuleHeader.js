import React, { PropTypes } from 'react'
import { Button } from 'antd'
import { StyledBPHeader } from './styled-components'

export const BPMeasureModuleHeader = ({
  isEditing,
  handleCancelBtn,
  handleSaveBtn,
}) => (<StyledBPHeader>
  <div>血压自测模组</div>
  {
    isEditing && <div>
      <Button
        onClick={handleCancelBtn}
        style={{ marginRight: '10px' }}
      >取消</Button>
      <Button
        type="primary"
        icon="save"
        onClick={handleSaveBtn}
      >保存</Button>
    </div>
  }
</StyledBPHeader>)

BPMeasureModuleHeader.propTypes = {
  isEditing: PropTypes.bool,
  handleCancelBtn: PropTypes.func,
  handleSaveBtn: PropTypes.func,
}

import React, { PropTypes } from 'react'
import { Button } from 'antd'
import { StyledNoDataPage, StyledNoDataInfo } from '../../medical-history/components/styled-components'

const NoDataPage = ({ editNutrition, isEditing }) => (<StyledNoDataPage>
  <StyledNoDataInfo>患者尚未有营养评估</StyledNoDataInfo>
  <Button
    type="primary"
    icon="file-add"
    onClick={() => editNutrition()}
    disabled={isEditing}
  >新营养评估</Button>
</StyledNoDataPage>)

NoDataPage.propTypes = {
  editNutrition: PropTypes.func,
  isEditing: PropTypes.func,
}

export default NoDataPage

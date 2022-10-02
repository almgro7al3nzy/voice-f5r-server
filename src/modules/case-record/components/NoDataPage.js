import React, { PropTypes } from 'react'
import { Button } from 'antd'
import {
  StyledNoDataBlank,
  StyledNoDataPage,
  StyledNoDataInfo,
  StyledNoDataPageInside,
} from './styled-components'

const NoDataPage = ({ popupNewRecord, caseRecordsForPatient, isEditing }) => (
  <StyledNoDataPage>
    <StyledNoDataBlank />
    <StyledNoDataPageInside>
      <StyledNoDataInfo>尚未有电子病历</StyledNoDataInfo>
      <Button
        type="primary"
        icon="file-add"
        onClick={() => popupNewRecord(caseRecordsForPatient)}
        disabled={isEditing}
      >
        新病历
      </Button>
    </StyledNoDataPageInside>
  </StyledNoDataPage>
)

NoDataPage.propTypes = {
  popupNewRecord: PropTypes.func,
  caseRecordsForPatient: PropTypes.array,
  isEditing: PropTypes.func,
}

export default NoDataPage

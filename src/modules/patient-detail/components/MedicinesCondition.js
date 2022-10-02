import React from 'react'
import get from 'lodash/get'
import { Card } from 'antd'
import moment from 'moment'
import { StyledBPHeader, StyledFlex, StyledText, StyledDesc } from './styled-component'

const MedicinesCondition = (props) => {
  const caseRecordDate = get(props, 'getPatientInfo.patient.medicinesCondition[0].caseRecordDate')
  const medicines = get(props, 'getPatientInfo.patient.medicinesCondition[0].prescription.medicines') || []
  const diagnosis = get(props, 'getPatientInfo.patient.medicinesCondition[0].diagnosis.description')
  return (<Card
    style={{ marginTop: '10px' }}
    title={
      caseRecordDate ? <StyledBPHeader>
        <div>当前正在服药</div>
        <div style={{
          fontSize: '12px',
          color: '#948f8f',
        }}
        >起始日期{moment(caseRecordDate).format('YYYY-MM-DD')}</div>
      </StyledBPHeader> : '当前正在服药'
    }
    bordered
  >
    <div style={{
      minHeight: '54px',
      padding: '10px 0px',
      color: '#1d273a',
    }}
    >
      {
        medicines.length ? medicines.map(medicine => (<StyledFlex
          isJustContent
          marginBottom="5px"
          key={medicine.name}
        >
          <StyledText fontSize="14px" fontWeight={600}>{medicine.name}</StyledText>
          <StyledFlex>
            <StyledText>{medicine.dosage}mg</StyledText>
            <StyledText marginLeft="5px">{medicine.usage}</StyledText>
          </StyledFlex>
        </StyledFlex>)) : '暂无'
      }
    </div>
    <StyledDesc>
      <span>医嘱:</span>
      <span style={{ fontSize: '12px', fontWeight: 'normal', marginLeft: '10px' }}>{diagnosis || '无'}</span>
    </StyledDesc>
  </Card>)
}

export default MedicinesCondition

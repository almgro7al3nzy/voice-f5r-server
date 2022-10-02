import React, { PropTypes } from 'react'
import { RowItem, RowItemLabel, StyledConclusion } from './styled-components'
import * as medicalInfos from '../constants'
import ViewItem from './ViewItem'
import ViewFamilyHistory from './ViewFamilyHistory'

const showTypes = [
  'riskFactors',
  'targetOrganDamage',
  'withClinicalIllness',
  'antihypertensiveDrugsContraindications',
  'otherMedicalHistory',
  'allergyHistory',
]

const MedicalDetails = (props) => {
  const { courseOfHypertension, riskLevelMap, hypertensionLevelMap } = medicalInfos
  const { medicalHistory = {} } = props
  const { systolic, diastolic } = medicalHistory.highestBloodPressureInClinic || {}
  const { hypertensionLevel, riskLevel } = medicalHistory.conclusion || {}
  return (<div>
    <RowItem isInline marginBottom={5}>
      <RowItemLabel>{courseOfHypertension.label} :</RowItemLabel>
      <RowItemLabel color="#7d7a7a">{medicalHistory.courseOfHypertension}年</RowItemLabel>
    </RowItem>
    <RowItem isInline marginBottom={5}>
      <RowItemLabel>{medicalInfos.highestBloodPressureInClinic.label} :</RowItemLabel>
      {
        systolic && <RowItemLabel color="#7d7a7a">{systolic}/{diastolic}mmol/L</RowItemLabel>
      }
    </RowItem>
    {
      showTypes.map(showType => (<ViewItem
        key={showType}
        type={showType}
        optionsValue={medicalHistory[showType]}

      />))
    }
    <ViewFamilyHistory
      familyHistory={medicalHistory.familyHistory}
    />
    <StyledConclusion noBottom>
      <RowItemLabel fontSize={16}>结论</RowItemLabel>
      <p>{hypertensionLevelMap[hypertensionLevel]}/{riskLevelMap[riskLevel]}</p>
    </StyledConclusion>
  </div>)
}

MedicalDetails.propTypes = {
  medicalHistory: PropTypes.object,
}

export default MedicalDetails

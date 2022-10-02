import React, { PropTypes } from 'react'
import moment from 'moment'
import { RowItem, RowItemLabel, StyledConclusion, OrderNumberLabel } from './styled-components'
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
  const years = moment().diff(moment(medicalHistory.courseOfHypertension), 'years')
  const yearsString = years === 0 ? '近一年发现高血压' : `${years.toString()}年`
  return (<div>
    <RowItem isInline marginBottom={5}>
      <OrderNumberLabel>{courseOfHypertension.label} :</OrderNumberLabel>
      <RowItemLabel color="#7d7a7a">{yearsString}</RowItemLabel>
    </RowItem>
    <RowItem isInline marginBottom={5}>
      <OrderNumberLabel>{medicalInfos.highestBloodPressureInClinic.label} :</OrderNumberLabel>
      {
        systolic && <RowItemLabel color="#7d7a7a">{systolic}/{diastolic}mmHg</RowItemLabel>
      }
    </RowItem>
    {
      showTypes.map(showType => (<ViewItem
        isMedical={!!medicalHistory.isMedical}
        isAllergy={!!medicalHistory.isAllergy}
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

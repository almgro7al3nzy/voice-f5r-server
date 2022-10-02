import { gql } from 'react-apollo'
import isEqual from 'lodash/isEqual'

export const popupEditRiskCategory = content => (dispatch) => {
  dispatch({
    type: 'MODAL_SHOW',
    title: '修改危险因素',
    style: {
      height: '740px',
    },
    isShowModal: true,
    content,
    width: 1030,
  })
}

export const addRiskCategory = (origValues, props) => {
  const { form, patientId, mutationAddRiskCategory, queryLatestRiskCategory, closeModal } = props
  console.log(queryLatestRiskCategory)
  form.validateFields((err, fields) => {
    if (err) return
    const { riskFactors, targetOrganDamage, withClinicalIllness } = fields
    if (
      origValues && isEqual(origValues.riskFactors, riskFactors) &&
      isEqual(origValues.targetOrganDamage, targetOrganDamage) &&
      isEqual(origValues.withClinicalIllness, withClinicalIllness)
    ) {
      closeModal()
      return
    }

    const variables = {
      patientId,
      riskFactors,
      targetOrganDamage,
      withClinicalIllness,
    }

    mutationAddRiskCategory({
      variables,
    })
      .then(() => {
        queryLatestRiskCategory.refetch()
        closeModal()
      })
      .catch((e) => {
        console.log(e)
      })
  })
}

export const queryLatestRiskCategory = gql`
  query queryLatestRiskCategory($patientId: ID!) {
    riskCategoriesForPatient(patientId: $patientId) {
      riskFactors
      targetOrganDamage
      withClinicalIllness
    }
  }
`

export const mutationAddRiskCategory = gql`
  mutation addRiskCategory(
    $patientId: ID!
    $riskFactors: [RiskFactors!]
    $targetOrganDamage: [TargetOrganDamage!]
    $withClinicalIllness: [WithClinicalIllness!]
  ) {
    addRiskCategory(
      patientId: $patientId
      riskFactors: $riskFactors
      targetOrganDamage: $targetOrganDamage
      withClinicalIllness: $withClinicalIllness
    ) {
      _id
    }
  }
`

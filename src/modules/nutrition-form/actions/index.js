import { gql } from 'react-apollo'

export const mutationAddNutritionList = gql`
  mutation addNutritionList(
      $patientId:ID!
      $nutritionProblem: String
      $batchInputs:[NutritionTypeInputs]
  ){
    addNutritionList(
          patientId :$patientId
          nutritionProblem: $nutritionProblem
          batchInputs:$batchInputs
      )
  }
`

export const mutationUpdateNutritionList = gql`
  mutation updateNutritionList(
      $_id:ID!
      $nutritionProblem: String
      $batchInputs:[NutritionTypeInputs]
  ){
    updateNutritionList(
          _id :$_id
          nutritionProblem: $nutritionProblem
          batchInputs:$batchInputs
      )
  }
`

export const queryPatientNutritionList = gql`
  query queryNutritionForm(
    $patientId:ID!
  ){
    queryNutritionForm(
      patientId:$patientId
    ) {
      _id
      patientId
      nutritionProblem
      operateAt
      batchInputs {
        key
        category
        name
        # 早餐的值
        breakfast
        # 加餐-早餐
        addMileB
        # 午餐的值
        lunch
        # 加餐-午餐
        addMileL
        # 晚餐的值
        dinner
        # 加餐-晚餐
        addMileN
        #总计
        total
      }
    }
  }
  `
export const queryPatientById = gql`
  query queryPatientById($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      boundDetails {
        archivedManagement
      }
    }
  }
`

export const mutationRemoveNutritionList = gql`
  mutation removeNutrition($_id: ID!) {
    removeNutrition(_id: $_id)
  }
`

import { gql } from 'react-apollo'

export const mutationAddPhysicalExamination = gql`
mutation AddPhysicalExamination(
  $patientId: ID!
  $physicalExaminationTime: Date!
  $height: Float
  $weight: Float
  $sitLeftBloodPressure:SitLeftBloodPressureInput
  $sitRightBloodPressure:SitRightBloodPressureInput
  $stationLeftBloodPressure:StationLeftBloodPressureInput
  $stationRightBloodPressure:StationRightBloodPressureInput
  $waistline:Float
  $hipline:Float
) {
  addPhysicalExamination(
    patientId: $patientId,
    physicalExaminationTime: $physicalExaminationTime,
    height: $height,
    weight: $weight,
    sitLeftBloodPressure:$sitLeftBloodPressure,
    sitRightBloodPressure:$sitRightBloodPressure,
    stationLeftBloodPressure:$stationLeftBloodPressure,
    stationRightBloodPressure:$stationRightBloodPressure,
    waistline:$waistline,
    hipline:$hipline,
  ) {
      _id
    }
}
`

export const mutationUpdatePhysicalExamination = gql`
mutation UpdatePhysicalExamination(
  $physicalExaminationId: ID!
  $batch: UpdateInput!
) {
  updatePhysicalExamination(
    physicalExaminationId: $physicalExaminationId,
    batch: $batch,
  )
}
`

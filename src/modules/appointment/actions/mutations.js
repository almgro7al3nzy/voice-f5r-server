import { gql } from 'react-apollo'

export const mutationUpdateAppointment = gql`
  mutation MutationUpdateAppointment(
    $appointmentId: ID!
    $batch: AppointmentInput
  ) {
    updateAppointment(
      appointmentId: $appointmentId
      batch: $batch
    )
  }
`

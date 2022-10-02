import omit from 'lodash/omit'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'

const getValue = (obj, property) => get(obj, `patient.${property}`)

export const transformData = (appointments = []) => {
  const tempArrays = cloneDeep(appointments)
  return tempArrays.map(o => ({
    ...omit(o, 'patient'),
    fullName: getValue(o, 'fullName'),
    mobile: getValue(o, 'mobile'),
    patientId: getValue(o, '_id'),
    HISNumber: getValue(o, 'boundDetails.HISNumber'),
  }))
}

export const getAppointmentsInfo = (appointments = []) => {
  const result = {
    count: appointments.length,
    FIRST: 0,
    QUARTER: 0,
    YEAR: 0,
    ADDITION: 0,
  }
  appointments.forEach((o) => {
    result[o.status] += 1
  })
  return result
}

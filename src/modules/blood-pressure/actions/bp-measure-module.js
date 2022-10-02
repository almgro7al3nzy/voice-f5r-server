import { gql } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import { DAY_MEASURE_MODULE } from '../constants'

export const queryBPMeasureModule = gql`
  query GetBPMeasureModule($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      bpMeasureModule {
        _id
        Monday {
          morning
          daytime
          evening
        }
        Tuesday {
          morning
          daytime
          evening
        }
        Wednesday {
          morning
          daytime
          evening
        }
        Thursday {
          morning
          daytime
          evening
        }
        Friday {
          morning
          daytime
          evening
        }
        Saturday {
          morning
          daytime
          evening
        }
        Sunday {
          morning
          daytime
          evening
        }
      }
    }
  }
`

export const mutateUpdateBPMeasureModule = gql`
  mutation UpdateBPMeasureModule($_id: ID!, $batchBPMeasureModuleInput: BatchBPMeasureModuleInput) {
    updateBPMeasureModule(_id: $_id, batchBPMeasureModuleInput: $batchBPMeasureModuleInput)
  }
`

export const mutateAddBPMeasureModule = gql`
  mutation AddBPMeasureModule($patientId: String!, $batchBPMeasureModuleInput: BatchBPMeasureModuleInput) {
    addBPMeasureModule(patientId: $patientId, batchBPMeasureModuleInput: $batchBPMeasureModuleInput)
  }
`


export const pickDayMeasureModule = (editMeasureModule) => {
  const result = {}
  const DAY_TIME = ['morning', 'daytime', 'evening']
  DAY_MEASURE_MODULE.forEach((key) => {
    if (!isEmpty(editMeasureModule[key])) {
      result[key] = {}
      DAY_TIME.forEach((day) => {
        if (editMeasureModule[key][day]) {
          result[key][day] = true
        } else {
          result[key][day] = false
        }
      })
    }
  })
  return result
}

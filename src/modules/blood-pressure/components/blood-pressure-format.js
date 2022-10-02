import moment from 'moment'
import getBPResult from './blood-ressure-color.js'
import { BloodPressureLableMap } from '../constants'

const weekdays = '日一二三四五六'

export function getWeekday(time) {
  if (!time) return ''
  const m = moment(time)
  const today = +m.format('d')
  const thisYear = new Date().getFullYear()
  const yearOfTime = m.year()
  const isThisYear = thisYear === yearOfTime

  return m.format(isThisYear ? 'M月D日 周' : 'Y年M月D日 周') + weekdays[today]
}

const getTime = Date => `${moment(Date).format('HH:mm')}`

const getSituation = (Date) => {
  const hour = moment(Date).hour()
  if (hour >= 6 && hour < 9) {
    return '晨间'
  } else if (hour >= 9 && hour < 18) {
    return '白天'
  }
  return '晚上'
}
export function getRows(bloodPressureMeasurements) {
  const renderItems = (bloodPressureHistory) => {
    function shouldRenderDate(c, i, array) {
      if (i === 0) return true
      const m1 = moment(c.measuredAt)
      const m2 = moment(array[i - 1].measuredAt)
      if (!m1.isSame(m2, 'day')) return true
      return false
    }
    const rowList = []
    function getMeasureState(measureState) {
      if (measureState.length === 0) return ''
      const measureLabel = measureState
      const label = []
      const symptom = []
      measureLabel.map((item) => {
        if (item === 'DIZZY' || item === 'HEADACHE' || item === 'NAUSEA') {
          return symptom.push(BloodPressureLableMap[item])
        }
        return label.push(BloodPressureLableMap[item])
      })
      return {
        label: label.join(','),
        symptom: symptom.join(','),
      }
    }
    function renderDateItem(item) {
      const tableItem = {}
      const measureState = item.measurementContext ? getMeasureState(item.measurementContext) : null
      tableItem.HPressureValue = `${item.systolic}/`
      tableItem.VPressureValue = `${item.diastolic}`
      tableItem.BloodPressureValue = `${item.systolic}/${item.diastolic}`
      tableItem.colors = getBPResult({ HP: item.systolic, LP: item.diastolic })
      tableItem.average = Math.round(item.diastolic + ((item.systolic - item.diastolic) / 3))
      tableItem.pulse = item.heartRate
      tableItem.bpId = item._id
      tableItem.describle = item.describleContent ? item.describleContent : ''
      tableItem.noteLabel = measureState ? measureState.label : ''
      tableItem.noteSymptom = measureState ? measureState.symptom : ''
      tableItem.measurementSituation = getSituation(item.measuredAt)
      tableItem.measuredAt = getTime(item.measuredAt)
      tableItem.manualAddition = item.manualAddition
      const cityArray = ['天津市', '北京市', '上海市', '重庆市']
      if (item.location) {
        if (cityArray.includes(item.location.province)) {
          tableItem.city = item.location.province
        } else {
          tableItem.city = item.location.city
        }
      } else {
        tableItem.city = ''
      }
      return rowList.push(tableItem)
    }
    const cacheArray = []
    bloodPressureHistory.map((item, index, arr) => {
      if (shouldRenderDate(item, index, arr)) {
        cacheArray.push({
          type: 'dateRow',
          value: getWeekday(item.measuredAt),
        })
      }
      cacheArray.push(item)
      return ''
    })
    cacheArray.map((item, index) => {
      if (!item.type) {
        return renderDateItem(item, index)
      }
      return rowList.push(item)
    })
    return rowList
  }
  if (bloodPressureMeasurements && bloodPressureMeasurements.length) {
    return renderItems(bloodPressureMeasurements)
  }
  return null
}

export function getStatistic(bloodPressureMeasurements, safeRange, overproofTypes) {
  if (bloodPressureMeasurements.length === 0) {
    const result = {
      total: 0,
      overDiastolic: 0,
      overSystolic: 0,
      average: 0,
      standard: '0%',
    }
    return result
  }
  const bloodPressure = {
    totalDiastolic: 0,
    totalSystolic: 0,
    lengths: bloodPressureMeasurements.length,
    overproofSystolic: 0,
    overproofDiastolic: 0,
    standard: 0,
  }
  bloodPressureMeasurements.map((item) => {
    if (item.systolic < 135 && item.diastolic < 85) {
      bloodPressure.standard += 1
    }
    bloodPressure.totalDiastolic += item.diastolic
    bloodPressure.totalSystolic += item.systolic
    return true
  })
  overproofTypes.map((item) => {
    if (item.overproofType === 'double') {
      bloodPressure.overproofSystolic += 1
      bloodPressure.overproofDiastolic += 1
    } else if (item.overproofType === 'systolic') {
      bloodPressure.overproofSystolic += 1
    } else if (item.overproofType === 'diastolic') {
      bloodPressure.overproofDiastolic += 1
    }
    return true
  })
  const averageDiastolic = Math.round(bloodPressure.totalDiastolic / bloodPressure.lengths)
  const averageSystolic = Math.round(bloodPressure.totalSystolic / bloodPressure.lengths)
  const average = averageDiastolic && averageSystolic ?
    `${averageSystolic}/${averageDiastolic}` : 0
  const standard = Math.round((bloodPressure.standard / bloodPressure.lengths) * 100) ?
    `${Math.round((bloodPressure.standard / bloodPressure.lengths) * 100)}%` : '0%'
  const result = {
    total: bloodPressureMeasurements.length,
    overDiastolic: bloodPressure.overproofSystolic,
    overSystolic: bloodPressure.overproofDiastolic,
    average,
    standard,
  }
  return result
}

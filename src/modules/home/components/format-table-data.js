import moment from 'moment'
import getBPResult from '../../blood-pressure/components/blood-ressure-color.js'

const weekdays = '日一二三四五六'
const getTime = Date => `${moment(Date).format('M月D日 HH:mm')}`

export function getWeekday(time) {
  if (!time) return ''
  const m = moment(time)
  const today = +m.format('d')
  const thisYear = new Date().getFullYear()
  const yearOfTime = m.year()
  const isThisYear = thisYear === yearOfTime

  return m.format(isThisYear ? 'M月D日 周' : 'Y年M月D日 周') + weekdays[today]
}

export default function getRows(healthCareTeams) {
  const { overproofPatients, patients } = healthCareTeams
  const renderItems = (bloodPressureHistory) => {
    const test = []
    function renderDateItem(item) {
      const row = {
        _id: item._id,
        measuredAt: getTime(item.measuredAt),
        handleResult: item.handleResult ? item.handleResult : '',
        state: item.unHandleCount,
        patientId: item.patientId,
        BloodPressureValue: `${item.systolic}/${item.diastolic}`,
        HPressureValue: `${item.systolic}/`,
        VPressureValue: `${item.diastolic}`,
        sortTime: item.measuredAt,
      }
      const BPResult = getBPResult({ HP: item.systolic, LP: item.diastolic })
      const nameAndMobile = patients.filter(patient => item.patientId === patient._id)
      row.fullName = nameAndMobile.length ? nameAndMobile[0].fullName : '不存在该病人'
      row.mobile = nameAndMobile.length ? nameAndMobile[0].mobile : '不存在该病人'
      row.colors = BPResult
      return test.push(row)
    }
    const arrayOfTableRows = []
    bloodPressureHistory.map((item) => {
      arrayOfTableRows.push(item)
      return ''
    })
    arrayOfTableRows.map((item, index) => {
      if (!item.type) {
        return renderDateItem(item, index)
      }
      return test.push(item)
    })
    return test
  }
  if (overproofPatients && overproofPatients.length) {
    return renderItems(overproofPatients)
  }
  return null
}

import moment from 'moment'

export const isNumber = (value, expectLen) => {
  const reg = /^\d+$/
  let flag = false
  const isLength = !expectLen || (expectLen && (value && (value.length === expectLen)))
  if (value === '' || (!isNaN(value) && reg.test(value) && isLength)) {
    flag = true
  }
  return flag
}

export const isBetween = (value, min, max) => value >= min && value <= max

export const getLocalTime = (time) => {
  if (moment(time).isValid()) {
    const t = moment(time)
    const today = moment().startOf('day')
    const tomorrow = moment().endOf('day')
    if (t.isAfter(today) && t.isBefore(tomorrow)) return t.format('HH:mm')
    return t.format('MM月D日 HH:mm')
  }
  return time
}

import { find, isEmpty, isEqual, omit } from 'lodash'

export const compareMedicines = (isFirstTimeAddMedicines, preMeds, currentMeds) => {
  // 比较以前的药品和现在传入进来的药品的区别
  // 然后返回当前药品的状态（删除、修改、新增、不变）
  // 如果传入这次的药物是上一次药物中没有的，则是新增的药物 add
  // 如果传入这次的药物跟上一次药物中有一致的，然后判断该药物是不是有改动，如果有改动则是修改的药物 modify ，没有改动则状态变为 extend
  // 如果传入的上次药物中有的,并且status！= stop ，但是这次药物中没有的药物，则是删除的 stop
  if (isFirstTimeAddMedicines) {
    return currentMeds.map(medicine => ({ ...medicine, status: '' }))
  }
  let availableMedicines = currentMeds.map((medicine) => {
    let result = {}
    const { name } = medicine
    // 去除上次药物中已经停止使用的药物
    const avaPreMeds = preMeds.filter(o => o.status !== 'stop')
    // 比对上次药物中有的，并且这次药物中有的
    const tempObj = find(avaPreMeds, o => o.name === name)
    // 如果tempObj是空的，那就是新增的药物
    if (isEmpty(tempObj)) {
      result = { ...medicine, status: 'add' }
    } else if (!isEqual(omit(tempObj, 'status'), omit(medicine, 'status'))) {
      result = { ...medicine, status: 'modify' }
    } else {
      // 啥啥都没改的药物
      result = { ...medicine, status: 'extend' }
    }
    return result
  })
  // 剔除上次药物中状态是stop的药物不做比较
  const stopMeds = preMeds
    .filter(o => o.status !== 'stop')
    .map((medicine) => {
      const { name } = medicine
      const tempObj = find(currentMeds, o => o.name === name)
      if (isEmpty(tempObj)) {
        // 如果上次药物中有的,但是这次药物中没有,则是这次药物中删除的,就把这个药物添加到列表中,并且状态改为 stop
        return {
          ...medicine,
          status: 'stop',
        }
      }
      return null
    })
    .filter(o => o)
  if (stopMeds.length) {
    // 如果有这次停止服用的药物，则把这次的药物添加到上传药物列表中~
    availableMedicines = [...availableMedicines, ...stopMeds]
  }
  return availableMedicines
}

// 预处理传递过来的药物，并且返回上传到后台的药物名称。用法用量。状态
export const getFormatterMedicines = (medicines) => {
  const formatterMedicines = medicines.map((m) => {
    const medicine = {}
    medicine.name = m.name
    medicine.dosage = m.dosage
    medicine.usage = m.usage
    medicine.status = m.status || ''
    return medicine
  })
  return formatterMedicines
}
export const getMedicines = (isFirstTimeAddMedicines, preMeds, currentMeds) =>
  compareMedicines(
    isFirstTimeAddMedicines,
    getFormatterMedicines(preMeds),
    getFormatterMedicines(currentMeds),
  )

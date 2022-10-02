
export const followMaps = {
  FOLLOWED: {
    title: '已随访',
    color: '#bdbdbd',
  },
  TO_BE_FOLLOWED: {
    title: '记录随访',
    color: '#5791bf',
  },
  OVERDUE_FOLLOWED: {
    title: '逾期未访',
    color: '#bdbdbd',
  },
  UNMEASUREMENT: {
    title: '测量不足',
    color: '#f5a623',
  },
}

const defaultCols = [
  {
    title: '姓名',
    dataIndex: '',
    key: 'fullName',
    width: 65,
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'status',
    width: 65,
  },
]

export const toBeFollowedCols = [
  defaultCols[0],
  {
    title: '剩余',
    dataIndex: 'surplusDays',
    key: 'surplusDays',
    width: 42,
  },
  {
    title: '电话',
    dataIndex: 'patient.mobile',
    key: 'mobile',
  },
  defaultCols[1],
]

export const unmeasurementCols = [
  defaultCols[0],
  {
    title: '连续未测天数',
    dataIndex: 'surplusDays',
    key: 'surplusDays',
    width: 90,
  },
  {
    title: '电话',
    dataIndex: 'patient.mobile',
    key: 'mobile',
  },
  defaultCols[1],
]

export const overdueFollowedCols = [
  defaultCols[0],
  {
    title: '随访日期',
    dataIndex: 'followupDates',
    key: 'followupDates',
  },
  defaultCols[1],
]

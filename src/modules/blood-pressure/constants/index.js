export const BloodPressureLableMap = {
  BEFORE_TAKING_MEDICINE: '服药前',
  AFTER_TAKING_MEDICINE: '服药后',
  CALM: '平静',
  AFTER_INTENSE_EXERCISE: '剧烈运动后',
  AGITATED: '情绪波动',
  AFTER_DRINKING: '饮酒后',
  DIZZY: '头晕',
  HEADACHE: '头疼',
  NAUSEA: '恶心呕吐',
}

export const BP_ROW_NAME = [
  {
    property: 'Monday',
    title: '周一',
  },
  {
    property: 'Tuesday',
    title: '周二',
  },
  {
    property: 'Wednesday',
    title: '周三',
  },
  {
    property: 'Thursday',
    title: '周四',
  },
  {
    property: 'Friday',
    title: '周五',
  },
  {
    property: 'Saturday',
    title: '周六',
  },
  {
    property: 'Sunday',
    title: '周天',
  },
]

export const BP_COL_NAME = [
  {
    property: 'morning',
    title: '晨间',
    measureAt: [6, 8],
  },
  {
    property: 'daytime',
    title: '白天',
    measureAt: [9, 17],
  },
  {
    property: 'evening',
    title: '夜间',
    measureAt: [18, 21],
  },
]

export const DAY_MEASURE_MODULE = [
  'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
  'Sunday',
]

export const DEFAULT_MEASURE_MODULE = {
  Monday: {},
  Tuesday: {},
  Wednesday: {},
  Thursday: {},
  Friday: {},
  Saturday: {},
  Sunday: {},
}

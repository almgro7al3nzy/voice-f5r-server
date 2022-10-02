// import get from 'lodash/get'
import moment from 'moment'

const colSpan = [4, 20]
export const SHOW_INFOS = [
  {
    property: 'gender',
    label: '性别',
    getValue: (o) => {
      const maps = {
        MALE: '男',
        FEMALE: '女',
      }
      return maps[o]
    },
    colSpan,
  },
  {
    property: 'dateOfBirth',
    label: '年龄',
    getValue: o => moment().diff(moment(o), 'years'),
    colSpan,
  },
  {
    property: 'height',
    label: '身高',
    getValue: o => `${o}CM`,
    colSpan,
  },
  {
    property: 'weight',
    label: '体重',
    getValue: o => `${o}KG`,
    colSpan,
  },
  {
    property: 'BMI',
    label: 'BMI',
    getValue: o => o,
    colSpan,
  },
  {
    property: 'createdAt',
    label: '入组日期',
    getValue: o => o,
    colSpan: [8, 16],
  },
  {
    property: 'HISNumber',
    label: '病历号',
    getValue: o => o,
    colSpan: [6, 18],
  },
  {
    property: 'mobile',
    label: '手机',
    getValue: o => o,
    isPatient: true,
    colSpan,
  },
  {
    property: 'IDNumber',
    label: '证件',
    getValue: o => o,
    colSpan: [6, 18],
  },
  {
    property: 'highestEducationLevel',
    label: '教育',
    getValue: (o) => {
      const maps = {
        MIDDLE_SCHOOL_AND_BELOW: '初中以下',
        HIGH_SCHOOL: '高中',
        UNIVERSITY: '大学以上',
      }
      return maps[o]
    },
    colSpan,
  },
  {
    property: 'employmentStatus',
    label: '职业',
    getValue: (o) => {
      const maps = {
        labor: '工人',
        farmer: '农民',
        staff: '企事业职员',
        business: '经商',
        civilServant: '公务员',
        soldier: '军人',
        retired: '退休',
        others: '其他',
      }
      return maps[o]
    },
    colSpan,
  },
  {
    property: 'permanentPlaceOfRecidence',
    label: '常住地',
    getValue: (o) => {
      const { province, municipality, area, addressDetail } = o
      return `${province} ${municipality || ''}${area || ''} ${addressDetail || ''}`
    },
    colSpan: [6, 18],
  },
  {
    property: 'healthInsuranceType',
    label: '医保类型',
    getValue: (o) => {
      const maps = {
        PUBLIC: '公费',
        URBAN: '城镇医保',
        RURAL: '农村合作医疗',
        SELF_INSURED: '自费',
        COMMERCIAL: '商业保险',
      }
      return maps[o]
    },
    colSpan: [8, 16],
  },
  {
    property: 'averageMonthlyFamilyIncome',
    label: '家庭人均月收入',
    getValue: (o) => {
      const maps = {
        BELOW_FIVE_THOUSAND: '<5千元',
        FIVE_THOUSAND_TO_TEN_THOUSAND: '5千-1万元',
        ABOVE_TEN_THOUSAND: '>1万元',
      }
      return maps[o]
    },
    colSpan: [13, 11],
  },
  {
    property: 'emergencyContact',
    label: '家属',
    getValue: (o) => {
      const { fullName, mobile, relationshipToPatient } = o
      const relationShipMaps = {
        SPOUSE: '配偶',
        SON: '儿子',
        DAUGHTER: '女儿',
        SIBLING: '兄弟姐妹',
        FRIEND: '朋友',
        CHILD: '子女',
        RELATIVES: '旁系亲属',
      }
      return `${fullName || ''} ${mobile || ''} ${relationShipMaps[relationshipToPatient] || ''}`
    },
    colSpan,
  },
  {
    property: 'measurementDeviceStatus',
    label: '血压计',
    getValue: (o) => {
      const maps = {
        ISSUED: '已发放',
        NOT_YET_ISSUED: '未发放',
      }
      return maps[o]
    },
    colSpan: [6, 18],
  },
  {
    property: 'jsVersion',
    label: 'APP版本',
    getValue: o => o,
    colSpan: [8, 16],
  },
  {
    property: 'systemVersion',
    label: '手机版本',
    getValue: o => o,
    colSpan: [8, 16],
  },
]


const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
}

export const gender = {
  property: 'gender',
  label: '性别',
  rules: [{ required: true, message: '必填项', initialValue: 'MALE' }],
  radios: [
    { label: '男', value: 'MALE' },
    { label: '女', value: 'FEMALE' },
  ],
  formItemLayout: {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
  },
}

export const healthInsuranceType = {
  property: 'healthInsuranceType',
  label: '医保类型',
  rules: [{ required: false, message: '必填项' }],
  radios: [
    { label: '公费', value: 'PUBLIC' },
    { label: '城镇医保', value: 'URBAN' },
    { label: '农村合作医疗', value: 'RURAL' },
    { label: '自费', value: 'SELF_INSURED' },
    { label: '商业保险', value: 'COMMERCIAL' },
  ],
  formItemLayout,
}

export const averageMonthlyFamilyIncome = {
  property: 'averageMonthlyFamilyIncome',
  label: '家庭人均月收入',
  rules: [{ required: false }],
  radios: [
    { label: '<5千元', value: 'BELOW_FIVE_THOUSAND' },
    { label: '5千-1万元', value: 'FIVE_THOUSAND_TO_TEN_THOUSAND' },
    { label: '>1万元', value: 'ABOVE_TEN_THOUSAND' },
  ],
  formItemLayout,
}

export const highestEducationLevel = {
  property: 'highestEducationLevel',
  label: '教育',
  rules: [{ required: false, message: '必填项' }],
  radios: [
    { label: '初中以下', value: 'MIDDLE_SCHOOL_AND_BELOW' },
    { label: '高中', value: 'HIGH_SCHOOL' },
    { label: '大学以上', value: 'UNIVERSITY' },
  ],
  formItemLayout,
}

export const employmentStatus = {
  property: 'employmentStatus',
  label: '职业',
  rules: [{ required: false, message: '必填项' }],
  radios: [
    { label: '工人', value: 'labor' },
    { label: '农民', value: 'farmer' },
    { label: '企事业职员', value: 'staff' },
    { label: '经商', value: 'business' },
    { label: '公务员', value: 'civilServant' },
    { label: '军人', value: 'soldier' },
    { label: '退休', value: 'retired' },
    { label: '其他', value: 'others' },
  ],
  formItemLayout,
}

export const measurementDeviceStatus = {
  property: 'measurementDeviceStatus',
  label: '血压计',
  rules: [{ required: false, message: '必填项' }],
  radios: [
    { label: '已发放', value: 'ISSUED' },
    { label: '未发放', value: 'NOT_YET_ISSUED' },
  ],
  formItemLayout,
}

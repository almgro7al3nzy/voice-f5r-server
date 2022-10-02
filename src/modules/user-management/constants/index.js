import { Icon } from 'antd'
import React from 'react'
import { isNumber } from '../../common/utils'

export const departmentMaps = [
  { value: 'ENDOCRINE', label: '内分泌科' },
  { value: 'CARDIOVASCULAR', label: '心血管科' },
  { value: 'IHEALTH', label: 'iHealth' },
]

export const roleMaps = [
  { label: '主任医师', value: 'CHIEF_PHYSICIAN' },
  { label: '副主任医师', value: 'DEPUTY_CHIEF_PHYSICIAN' },
  { label: '主治医师', value: 'ATTENDING_PHYSICIAN' },
  { label: '住院医师', value: 'RESIDENT' },
  { label: '健康照护师', value: 'ASSISTANT' },
  { label: '护士', value: 'NURSE' },
  { label: '管理员', value: 'ADMIN' },
  { label: '学习者', value: 'LEARNER' },
]

export const doctorList = [
  'CHIEF_PHYSICIAN', 'DEPUTY_CHIEF_PHYSICIAN',
  'ATTENDING_PHYSICIAN', 'RESIDENT',
]

export const columns = [
  {
    title: '姓名',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'action',
  },
]

export const role = {
  property: 'role',
  label: '角色',
  rules: [{ required: true, message: '必填项' }],
  radios: roleMaps,
  formItemLayout: {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  },
}
export const department = {
  property: 'department',
  label: '部门',
  rules: [{ required: true, message: '必填项' }],
  radios: departmentMaps,
  formItemLayout: {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  },
}

export const inputFields = [
  {
    property: 'fullName',
    label: '姓名',
    rules: [{ required: true, message: '必填项' }],
    formItemLayout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 },
    },
  },
  {
    property: 'mobile',
    label: '手机号',
    rules: [
      { required: true, message: '必填项' },
      {
        validator: (rule, value, callback) => {
          if (isNumber(value, 11)) {
            callback()
          } else {
            callback('手机号为11位有效数字')
          }
        },
      },
    ],
    formItemLayout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 },
    },
    prefix: <Icon type="phone" />,
  },
]

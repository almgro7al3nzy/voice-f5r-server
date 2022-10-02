import { fromJS } from 'immutable'

export const ASSESSMENT_SEVERITY = {
  SERIOUS_PROBLEM: { text: '问题严重', color: '#8f0f1f' },
  NEED_ATTENTION: { text: '需要关注', color: '#ff5200' },
  SLIGHT_ABNORMAL: { text: '轻度异常', color: '#f6a623' },
  FINE: { text: '良好', color: '#5db300' },
  NOT_ASSESSMENT: { text: '未评估', color: '#9b9b9b' },
}

export const SOAP_CATEGORY = [
  { value: 'medicine', text: 'A药物', upperCase: 'MEDICINE' },
  { value: 'monitor', text: 'B监测', upperCase: 'MONITOR' },
  { value: 'diet', text: 'C饮食', upperCase: 'DIET' },
  { value: 'solution', text: 'D问题解决', upperCase: 'SOLUTION' },
  { value: 'sports', text: 'E运动', upperCase: 'SPORTS' },
  { value: 'healthAdjustment', text: 'F健康调适', upperCase: 'HEALTH_ADJUSTMENT' },
  { value: 'reduceRisk', text: 'G降低风险', upperCase: 'REDUCE_RISK' },
]

export const ASSESSMENT_SEVERITY_DEFAULT_VALUE = fromJS({
  medicine: 'NOT_ASSESSMENT',
  monitor: 'NOT_ASSESSMENT',
  diet: 'NOT_ASSESSMENT',
  solution: 'NOT_ASSESSMENT',
  sports: 'NOT_ASSESSMENT',
  healthAdjustment: 'NOT_ASSESSMENT',
  reduceRisk: 'NOT_ASSESSMENT',
})

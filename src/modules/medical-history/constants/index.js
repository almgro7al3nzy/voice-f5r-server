import * as Maps from '../../common/constants'

export const courseOfHypertension = {
  label: '高血压病程',
  key: 'courseOfHypertension',
  options: [],
}

export const highestBloodPressureInClinic = {
  label: '诊室最高血压',
  key: 'highestBloodPressureInClinic',
  options: [],
}

export const riskFactors = {
  label: '危险因素',
  key: 'riskFactors',
  options: [
    {
      key: 'HYPERTENSIONLEVEL',
      label: '高血压水平1-3级',
    },
    {
      key: 'FIFTY_FIVE_FOR_MALE_SIXTY_FIVE_FOR_FEMALE',
      label: '男性>55岁，女性>65岁',
    },
    {
      key: 'SMOKING',
      label: '吸烟',
    },
    {
      key: 'IMPAIRED_GLUCOSE_TOLERANCE',
      label: '糖耐量受损（餐后2小时血糖7.8-11.0mmol/L）和/或空腹血糖异常(6.1-6.9mmol/L)',
    },
    {
      key: 'DYSLIPIDEMIA',
      label:
        '血脂异常：总胆固醇≥5.7 mmol/L（220mg/dl）或低密度脂蛋白胆固醇>3.3 mmol/L(130 mg/dl)或高密度脂蛋白胆固醇<1.0 mmol/L（40 mg/dl）',
    },
    {
      key: 'CARDIOVASCULAR_DISEASE',
      label: '早发心血管病家族史（一级亲属发病年龄<50岁）',
    },
    {
      key: 'ABDOMINAL_OBESITY',
      label: '腹型肥胖（腰围：男性≥90cm；女性≥85 cm）或肥胖（BMI≥28kg/m2）',
    },
    {
      key: 'ABOVE_HOMOCYSTEINE_TEN',
      label: '高同型半胱氨酸>10μmol/L',
    },
  ],
}

export const targetOrganDamage = {
  label: '靶器官损害',
  key: 'targetOrganDamage',
  options: [
    {
      key: 'ELECTROCARDIOGRAM',
      label: '心电图或超声心动图示左心室肥厚',
    },
    {
      key: 'CAROTID_ULTRASOUND',
      label: '颈动脉超声：颈动脉内膜中层厚度>0.9mm或动脉粥样斑块',
    },
    {
      key: 'FEMORAL_ARTERY_PULSE_WAVE_VELOCITY',
      label: '颈-股动脉脉搏波速度>12m/s（选择使用）',
    },

    {
      key: 'ANKLE_ARM_BLOOD_PRESSURE',
      label: '踝臂血压指数<0.9（选择使用）',
    },
    {
      key: 'GLOMERULAR_FILTRATION_RATE',
      label:
        '估算的肾小球滤过率降低[eGFR<60ml/(min*1.73m2)]或血清肌酐轻度升高：男性115-133μmol/L（1.3-1.5mg/dl）,女性107-124μmol/L（1.2-1.4mg/dl）',
    },
    {
      key: 'MICROALBUMINURIA',
      label: '微量白蛋白尿：30-300mg/24h或白蛋白/肌酐≥30 mg/g（3.5 mg/mmol）',
    },
  ],
}

export const withClinicalIllness = {
  label: '伴临床疾患（并发症）',
  key: 'withClinicalIllness',
  options: [
    {
      key: 'CEREBROVASCULAR_DISEASE',
      label: '脑血管病：脑出血、缺血性脑卒中、短暂性脑缺血发作',
    },
    {
      key: 'HEART_DISEASE',
      label: '心脏疾病：心肌梗死史、心绞痛、冠状动脉血运重建史、慢性心衰',
    },
    {
      key: 'KIDNEY_DISEASE',
      label: '肾脏疾病：糖尿病肾病、肾功能受损、血肌酐（男性>133μmol/L，女性>124μmol/L）、蛋白尿（>300mg/24h）',
    },
    {
      key: 'PERIPHERAL_VASCULAR_DISEASE',
      label: '外周血管疾病',
    },
    {
      key: 'RETINOPATHY',
      label: '视网膜病变：出血或渗出、视乳头水肿',
    },
    {
      key: 'DIABETES',
      label: '糖尿病：空腹血糖≥7.0mmol/L(126mg/dl)、餐后血糖≥11.1 mmol/L（200mg/dl）、糖化血红蛋白≥6.5%',
    },
  ],
}

export const antihypertensiveDrugsContraindications = {
  label: '降压药禁忌症',
  key: 'antihypertensiveDrugsContraindications',
  options: [
    {
      key: 'RAPID_ARRHYTHMIA',
      label: '快速型心律失常',
    },
    {
      key: 'HEART_FAILURE',
      label: '心力衰竭',
    },
    {
      key: 'DEGREE_ATRIOVENTRICULAR_BLOCK',
      label: 'Ⅱ-Ⅲ度房室传导阻滞',
    },
    {
      key: 'PREGNANCY',
      label: '妊娠',
    },
    {
      key: 'GOUT',
      label: '痛风',
    },
    {
      key: 'ASTHMA',
      label: '哮喘',
    },
    {
      key: 'CHRONIC_OBSTRUCTIVE_PULMONARY_DISEASE',
      label: '慢性阻塞性肺疾病',
    },
    {
      key: 'BILATERAL_RENAL_ARTERY_STENOSIS',
      label: '双侧肾动脉狭窄',
    },
    {
      key: 'RENAL_INSUFFICIENCY',
      label: '肾功能不全',
    },
    {
      key: 'HYPERKALEMIA',
      label: '高血钾',
    },
    {
      key: 'IMPAIRED_GLUCOSE_TOLERANCE',
      label: '糖耐量减低',
    },
    {
      key: 'ATHLETE',
      label: '运动员',
    },
  ],
}

export const otherMedicalHistory = {
  label: '其他病史',
  key: 'otherMedicalHistory',
  options: {
    key: 'isMedical',
    label: '无其他病史',
  },
}

export const allergyHistory = {
  label: '过敏史',
  key: 'allergyHistory',
  options: {
    key: 'isAllergy',
    label: '无其他过敏史',
  },
}

const mapHistorys = [
  {
    key: 'HYPERTENSION',
    label: '高血压',
  },
  {
    key: 'CEREBROVASCULARDISEASE',
    label: '脑血管病（脑出血、缺血性脑卒中、短暂性脑缺血发作等）',
  },
  {
    key: 'CARDIOVASCULARDISEASE',
    label: '心血管病（心肌梗死、心绞痛、冠脉血运重建、慢性心衰等）',
  },
  {
    key: 'KIDNEYDISEASE',
    label: '肾脏疾病（糖尿病肾病、肾功能受损等）',
  },
  {
    key: 'DIABETES',
    label: '糖尿病',
  },
  {
    key: 'PERIPHERALVASCULARDISEASE',
    label: '外周血管疾病',
  },
  {
    key: 'RETINOPATHY',
    label: '视网膜病变（出血、渗出或视乳头水肿）',
  },
  {
    key: 'OTHERS',
    label: '其他',
  },
]
export const familyHistory = {
  label: '家族史',
  key: 'familyHistory',
  options: mapHistorys,
  familyGroup: [
    {
      key: 'father',
      label: '父亲',
    },
    {
      key: 'mother',
      label: '母亲',
    },
    {
      key: 'sibling',
      label: '兄弟姐妹',
    },
    {
      key: 'child',
      label: '子女',
    },
  ],
}

export const riskLevelMap = Maps.riskLevelMap

export const hypertensionLevelMap = Maps.hypertensionLevelMap

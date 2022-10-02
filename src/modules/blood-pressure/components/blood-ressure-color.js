export const aBPStandards = [
  { id: 0, color: '#5EB300', text: '正常血压', desp: '正常血压 <120 和  <80' },
  { id: 1, color: '#F5A623', text: '正常高值血压', desp: '正常高值血压 120-139 和（或）80-90' },
  { id: 2, color: '#FA7252', text: '一级高血压', desp: '一级高血压（轻度）140-159 和（或）90-99' },
  { id: 3, color: '#E50037', text: '二级高血压', desp: '二级高血压（中度）160-179 和（或）100-109' },
  { id: 4, color: '#AD1457', text: '三级高血压', desp: '三级高血压（重度）≥180 和（或）≥110' },
  { id: 5, color: '#79B0EC', text: '低血压', desp: '低血压 <89 和 <59' },
]

export function getBPLevelByStandard(hp, lp) {
  if (hp < 89 && lp < 59) {
    return aBPStandards[5]
  }
  if (hp >= 180 || lp >= 110) {
    return aBPStandards[4]
  }
  if ((hp >= 160 && hp < 180) || (lp >= 100 && lp < 110)) {
    return aBPStandards[3]
  }
  if ((hp >= 140 && hp < 160) || (lp >= 90 && lp < 100)) {
    return aBPStandards[2]
  }
  if ((hp >= 120 && hp < 140) || (lp >= 80 && lp < 90)) {
    return aBPStandards[1]
  }
  if (hp < 120 && lp < 80) {
    return aBPStandards[0]
  }
  return null
}

export function getHPLevelByStandard(hp) {
  if (hp >= 180) {
    return aBPStandards[4]
  }
  if (hp >= 160 && hp < 180) {
    return aBPStandards[3]
  }
  if (hp >= 140 && hp < 160) {
    return aBPStandards[2]
  }
  if (hp >= 120 && hp < 140) {
    return aBPStandards[1]
  }
  if (hp >= 89 && hp < 120) {
    return aBPStandards[0]
  }
  return aBPStandards[5]
}

export function getLPLevelByStandard(lp) {
  if (lp >= 110) {
    return aBPStandards[4]
  }
  if (lp >= 100 && lp < 110) {
    return aBPStandards[3]
  }
  if (lp >= 90 && lp < 100) {
    return aBPStandards[2]
  }
  if (lp >= 80 && lp < 90) {
    return aBPStandards[1]
  }
  if (lp >= 59 && lp < 80) {
    return aBPStandards[0]
  }
  return aBPStandards[5]
}

export default function getBPResult({ HP, LP }) {
  return {
    HPLEVEL: getHPLevelByStandard(HP),
    LPLEVEL: getLPLevelByStandard(LP),
    BPLEVEL: getBPLevelByStandard(HP, LP),
  }
}

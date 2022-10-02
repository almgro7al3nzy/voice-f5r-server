import React from 'react'
import styled from 'styled-components'

export const Menu = styled.div`width: 180px;height:400px;`

export const TabLabel = styled.div`
  cursor: ${props => (props.isActive || props.overdue ? 'auto' : 'pointer')};
  display: flex;
  flex-flow: column nowrap;
  flex: 1 0 auto;
  height: 40px;
  background-color: ${(props) => {
    if (props.isActive) return '#fff'
    if (props.overdue) return '#666'
    return 'unset'
  }};
  ${(props) => {
    if (!props.isActive && !props.overdue) { return { '&:hover': { background: 'rgba(255, 255, 255, 0.2)' } } }
    return null
  }};
`

export const TabLabelTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1 auto;
  padding: 0 15px;
`

export const TabLabelText = styled.div`
  color: ${props => (props.isActive ? props.theme.general.color.TITLE : '#fff')};
  font-weight: ${props => (props.isActive ? 500 : 200)};
  white-space: nowrap;
`

export const Bamboo = styled.div`
  display: flex;
  flex: 0 0 auto;
  height: 4px;
  align-self: stretch;
`

export const SectionOfBamboo = styled.div`
  flex: 1 1 auto;
  background-color: ${props => props.color || '#d8d8d8'};
  margin: 0 1px;
`

const TipsWrapper = styled.div`
  padding: 15px;
  font-weight: lighter;
  width: 180px;
`
const TipsTitle = styled.div`
  margin: 20px 0 5px 0;
  &:first-of-type {
    margin-top: 0;
  }
`
const TipsTag = styled.span`
  padding: 2px 10px 2px 0;
  display: flex;
  align-items: center;
`
const TipsBlock = styled.span`
  background-color: ${props => props.color};
  width: 6px;
  height: 6px;
  margin-right: 5px;
`
const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const Tips = (
  <TipsWrapper>
    <TipsTitle>从左至右色标分别代表:</TipsTitle>
    <TagWrapper>
      <TipsTag>A药物</TipsTag>
      <TipsTag>B监测</TipsTag>
      <TipsTag>C饮食</TipsTag>
      <TipsTag>D问题解决</TipsTag>
      <TipsTag>E运动</TipsTag>
      <TipsTag>F健康调适</TipsTag>
      <TipsTag>G降低风险</TipsTag>
    </TagWrapper>
    <TipsTitle>图例:</TipsTitle>
    <TagWrapper>
      <TipsTag>
        <TipsBlock color="#7ed321" />良好
      </TipsTag>
      <TipsTag>
        <TipsBlock color="#f6a623" />轻度异常
      </TipsTag>
      <TipsTag>
        <TipsBlock color="#ff5300" />需要关注
      </TipsTag>
      <TipsTag>
        <TipsBlock color="#910f1e" />问题严重
      </TipsTag>
      <TipsTag>
        <TipsBlock color="#d8d8d8" />未评估
      </TipsTag>
    </TagWrapper>
  </TipsWrapper>
)

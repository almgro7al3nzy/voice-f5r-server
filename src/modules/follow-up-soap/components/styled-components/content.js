import styled from 'styled-components'

export const Screen = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  justify-content: stretch;
  margin: 18px 25px;
  overflow-y: auto;
`

export const EmptyScreen = Screen.extend`
  align-items: center;
  justify-content: center;
`

export const ContentLabel = styled.div`
  font-size: 14px;
  color: #39475b;
  margin-bottom: 14px;
`

export const Content = styled.div`
  font-size: 12px;
  color: ${props => props.theme.general.color.TITLE};
  white-space: pre-wrap;
  word-break: break-all;
`

export const DashedLine = styled.div`
  border-bottom: 1px dashed #ccc;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  margin: 20px 0;
`

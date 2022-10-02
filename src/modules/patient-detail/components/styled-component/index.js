import styled from 'styled-components'

export const StyledBPHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${p => p.isJustContent ? 'space-between' : 'normal'};
  margin-bottom: ${p => p.marginBottom || '0px'};
`

export const StyledText = styled.div`
  font-size: ${p => p.fontSize || '12px'};
  color: #1d273a;
  font-weight: ${p => p.fontWeight || 'normal'};
  margin-left: ${p => p.marginLeft || '0px'};
`

export const StyledDesc = styled.p`
  padding-top: 10px;
  border-top: 1px solid #dddddd;
  span {
    font-size: 14px;
    font-weight: 600;
    color: #1d273a;
  }
`

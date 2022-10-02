import styled from 'styled-components'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

export const StyledLayout = styled(Layout)`height: 100vh;`
export const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0;
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  padding-left: 19px;
  border-bottom: 1px solid ${props => props.theme.general.color.BORDER};
  font-weight: bold;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
export const StyledContent = styled(Content)`
  width: 100%;
  background: #e9ebef;
`
export const StyledFooter = styled(Footer)`
  padding: 3px 50px;
  text-align: center;
  border-top: 1px solid #cfcfcf;
`

export const HospitalName = styled.div`
  flex: 0 0 auto;
  color: ${props => props.theme.general.color.PRIMARY};
  font-weight: lighter;
`

export const SystemName = styled.div`
  flex: 0 0 auto;

  color: ${props => props.theme.general.color.TITLE};
`

export const PowerBy = styled.div`
  flex: 0 0 auto;
  color: ${props => props.theme.general.color.BORDER};
  font-size: ${props => props.theme.general.size.SMALL};
  font-weight: 100;
  margin-left: 5px;
`
export const RightSideContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
`
export const DividingLine = styled.div`
  width: 1px;
  height: 36px;
  margin: 10px 20px;
  border-left: 1px solid #979797;
`

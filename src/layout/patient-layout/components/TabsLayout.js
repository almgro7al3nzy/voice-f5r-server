import React, { PropTypes } from 'react'
import styled from 'styled-components'

export const TabsLayout = ({ title, buttons, menu, addition, content }) => (
  <OverLayer>
    <Header>
      <Infos>{title}</Infos>
      <Operations>{buttons}</Operations>
    </Header>
    <Body>
      <MenuWrapper>
        <TabsWrapper>{menu}</TabsWrapper>
        <AdditionWrapper>{addition}</AdditionWrapper>
      </MenuWrapper>
      <ContentWrapper>{content}</ContentWrapper>
    </Body>
  </OverLayer>
)

TabsLayout.propTypes = {
  title: PropTypes.object,
  buttons: PropTypes.array,
  menu: PropTypes.object,
  addition: PropTypes.object,
  content: PropTypes.object,
}

const FlexDiv = styled.div`display: flex;`

const OverLayer = FlexDiv.extend`
  flex-direction: column;
  min-height: 500px;
  height: calc(100vh - 160px);
`

const Header = FlexDiv.extend`
  flex-direction: row;
  flex: 0 0 32px;
  background-color: ${props => props.theme.general.color.TITLE};
  border-radius: 4px 4px 0px 0px;
  align-items: center;
  color: #fff;
  padding: 0 10px;
`
const Body = FlexDiv.extend`
  flex: 1 1 auto;
  align-items: stretch;
`

const Infos = FlexDiv.extend`
  flex: 2;
  padding-left: 5px;
`

const Operations = FlexDiv.extend`
  flex: 1;
  justify-content: flex-end;
  padding-right: 5px;
  .ant-btn[disabled] {
    color: #fff;
    border: none;
    padding-right: -5px;
    background-color: #62708b;
  }
`

const MenuWrapper = FlexDiv.extend`
  flex-direction: column;
  flex: 0 1 auto;
  color: #fff;
  background-color: ${props => props.theme.general.color.TITLE};
  border-bottom-left-radius: 4px;
`

const TabsWrapper = styled.div`
  flex: 1 0 auto;
  overflow-y: auto;
`

const AdditionWrapper = styled.div`flex: 0 1;`

const ContentWrapper = FlexDiv.extend`
  flex: 1 1 auto;
  background-color: #fff;
  border-bottom-right-radius: 4px;
`

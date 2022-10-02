import styled from 'styled-components'

export const ButtonWithIcon = styled.span`
  color: #fff;
  cursor: pointer;
  font-weight: 300;
  padding: 3px 5px;
  > i::before {
    font-size: 16px;
  }
  > span {
    padding-left: 5px;
  }
`

export const ButtonWithRadius = ButtonWithIcon.extend`
  background-color: ${props => props.theme.general.color.PRIMARY};
  border-radius: 4px;
  margin: 10px;
  padding: 6px 8px;
`

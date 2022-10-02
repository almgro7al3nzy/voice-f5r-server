import styled from 'styled-components'
import { Icon, Badge } from 'antd'

export const StyIncomingMessageButton = styled(Icon)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 20px;
  cursor: pointer;
`
export const StyBadge = styled(Badge)`
  .ant-badge-count {
    position: absolute;
    left: 40px;
    top: 6px;
    font-size: ${props => props.theme.general.size.small};
    font-weight: 100;
  }
`

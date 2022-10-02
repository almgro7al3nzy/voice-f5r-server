import styled from 'styled-components'
import { Icon, Input } from 'antd'

export const ChatInputContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 72px;
  padding: 4px;
  border-top: 1px solid ${props => props.theme.general.color.BORDER};
`

export const ChatButtonsContainer = styled.div`margin-top: 8px;`

export const ChatInput = styled(Input) `border: none !important;`

export const ChatImgAdditionButton = styled.img`
width:12px;
height:12px;
font-size: ${props => props.theme.general.size.LITTLE_LARGER};
cursor: pointer;
&:hover {
  background-color: #eee;
}
`

export const ChatAdditionButton = styled(Icon) `
  padding: 4px;
  font-size: ${props => props.theme.general.size.LITTLE_LARGER};
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`

export const EmojiTable = styled.div`
  width: 192px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  overflow-y: auto;
  font-size: 20px;
`

export const EmojiButton = styled.img`
  width: 28px;
  height: 28px;
  margin: 1px 2px;
  cursor: pointer;
  border-radius: 2px;
  &:hover {
    background-color: #eee;
  }
`
export const VoiceRecButton = styled.div`
  width: 360px;
  height: 80px;
  padding:16px;
  cursor: pointer;
  border-radius: 90px;
`

export const VoiceRecingButton = styled.div`
  width: 360px;
  height: 80px;
  padding:16px;
  cursor: pointer;
  border-radius: 90px;
  background-color:#D4FFFD;
`

export const VoiceRecButtonText = styled.div`
  height: 100%;
  padding-top:12px;
  font-size:14px;
  float:left;
  margin-left:10px;
  color:#909090;
`

export const VoiceRecingButtonText = styled.div`
height: 100%;
padding-top:12px;
font-size:14px;
float:left;
margin-left:10px;
color:#000000;
`

export const VoiceTitle = styled.div`
z-index:10;
position:absolute;
left:0px;
width:360px;
text-align: center;
top:-30px;
color:#FFF;
`

export const CountDown = styled.span`
font-size:16px;
`

export const VoiceRecButtonImg = styled.img`
width: 36px;
height: 36px;
float:left;
margin-top:5px;
margin-left:10px;
opacity:0.4;
`

export const VoiceRecingButtonImg = styled.img`
width: 32px;
height: 32px;
float:right;
margin-top:6px;
margin-right:15px;
`


import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import get from 'lodash/get'
import { roleMaps } from '../constants'

const SetAvatarContainer = (props) => {
  const fullName = get(props, 'userInfo.fullName')
  const mobile = get(props, 'userInfo.mobile')
  const role = get(props, 'userInfo.role')
  const avatar = get(props, 'userInfo.avatar')
  const { onLogoutClick } = props
  const roleObj = roleMaps.filter(o => o.value === role)
  return (
    <SetAvatarPanel>
      <SetAvatarHead>
        <SetAvatarImg>
          <ChangeAvatarImg src={avatar} />
          <label htmlFor="avatar">
            <ChangeAvatarButton>更改头像</ChangeAvatarButton>
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const reader = new FileReader()
              reader.onload = (x) => {
                props.setAvatar(x.target.result)
                props.updateAvatar(x.target.result)
              }
              reader.readAsDataURL(e.target.files.item(0))
            }}
          />
        </SetAvatarImg>
        <SetAvatarInfo>
          <SetAvatarName>{fullName}</SetAvatarName>
          <SetAvatarDuty>岗 位：{roleObj.length > 0 && roleObj[0].label}</SetAvatarDuty>
          <SetAvatarTel>手机号：{mobile}</SetAvatarTel>
        </SetAvatarInfo>
      </SetAvatarHead>
      <SetAvatarfooter>
        <StyButton onClick={() => onLogoutClick()}>退出</StyButton>
      </SetAvatarfooter>
    </SetAvatarPanel>
  )
}
SetAvatarContainer.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  setAvatar: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
}
const SetAvatarPanel = styled.div`
  margin-top: 15px;
  width: 276px;
  height: 130px;
`

const SetAvatarHead = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 100px;
`
const SetAvatarImg = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  align-items: center;
  width: 80px;
  height: 100px;
`
const ChangeAvatarImg = styled.img`
  display: flex;
  margin-bottom: 10px;
  background-color: gray;
  width: 68px;
  height: 68px;
  border-radius: 50%;
`
const ChangeAvatarButton = styled.div`
  width: 60px;
  height: 14px;
  cursor: pointer;
`
const SetAvatarInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 100px;
  border: 1px solid gary;
`
const SetAvatarName = styled.div`
  width: 80px;
  height: 20px;
  margin-bottom: 6px;
  font-family: PingFangSC;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
`
const SetAvatarDuty = styled.div`
  display: flex;
  flex-direction: row;
  width: 156px;
  height: 17px;
  opacity: 0.5;
  font-family: PingFangSC;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
`
const SetAvatarTel = styled.div`
  width: 125px;
  height: 17px;
  opacity: 0.5;
  font-family: PingFangSC;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
`
const SetAvatarfooter = styled.div`
  width: 280px;
  height: 30px;
`
const StyButton = styled(Button) `float: right;`
export default SetAvatarContainer

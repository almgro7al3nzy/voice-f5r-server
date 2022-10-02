import React, { PropTypes } from 'react'
import { StyledOperations } from './styled-components'
import { followMaps } from '../constants'

const CustomRender = (props) => {
  const { followup: { status, patient }, type } = props
  let color = ''
  let title = ''
  let path = `/patient/${patient._id}/blood-pressure`
  if (type === 'fullName') {
    color = '#5690c0'
    title = patient.fullName
  } else if (type === 'status') {
    color = followMaps[status].color
    title = followMaps[status].title
    path = `/patient/${patient._id}/follow-up-soap`
  }
  return (<StyledOperations
    color={color}
    onClick={() => {
      window.open(path, '_blank')
    }}
  >
    { title }
  </StyledOperations>)
}

CustomRender.propTypes = {
  followup: PropTypes.any,
  type: PropTypes.string,
}

export const formatColumns = (props, colums) => colums.map((column) => {
  const temp = column
  if (/fullName|status/g.test(column.key)) {
    temp.render = text =>
      (<CustomRender
        {...props}
        type={column.key}
        followup={text}
      />)
  }
  return temp
})

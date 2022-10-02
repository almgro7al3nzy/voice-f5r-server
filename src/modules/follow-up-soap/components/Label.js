import React, { PropTypes } from 'react'
import {
  Bamboo,
  SectionOfBamboo,
  TabLabel,
  TabLabelText,
  TabLabelTextWrapper,
} from './styled-components'

export const Label = ({ content, colors, isActive, onClick, overdue }) => (
  <TabLabel isActive={isActive} onClick={onClick} overdue={overdue}>
    <TabLabelTextWrapper>
      <TabLabelText isActive={isActive}>{content}</TabLabelText>
    </TabLabelTextWrapper>
    <Bamboo>{colors.map(color => <SectionOfBamboo key={color.key} color={color.color} />)}</Bamboo>
  </TabLabel>
)

Label.propTypes = {
  content: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  overdue: PropTypes.bool,
}

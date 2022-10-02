import React, { PropTypes } from 'react'
import styled from 'styled-components'

import PatientList from '../../patient/components/PatientList'

const PatientListSlider = props => (<div>
  <SliderContainer isOpenSliderNav={props.isOpenSliderNav}>
    { props.isOpenSliderNav && <PatientList {...props} /> }
  </SliderContainer>
  <Overlay
    isOpenSliderNav={props.isOpenSliderNav}
    onClick={props.togglePatientSider}
  />
</div>)

const SliderContainer = styled.div`
  position: absolute;
  top: 56px;
  bottom: 0px;
  width: 280px;
  transition: all 0.4s ease-in-out;
  transform: translateX(${props => props.isOpenSliderNav ? '0' : '-280'}px);
  z-index: ${props => props.theme.general.zIndex.SUB_MID};
`

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: ${props => props.isOpenSliderNav ? '54px' : 'null'};
  right: 0px;
  bottom: 0px;
  transition: opacity 0.3s;
  z-index: 1310;
  background-color: #000000;
  opacity: ${props => props.isOpenSliderNav ? '0.2' : '0'};
  z-index: ${props => props.theme.general.zIndex.BOTTOM};
`
PatientListSlider.propTypes = {
  isOpenSliderNav: PropTypes.bool.isRequired,
  togglePatientSider: PropTypes.func.isRequired,
}

export default PatientListSlider

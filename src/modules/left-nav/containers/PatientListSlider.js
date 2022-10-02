// import React from 'react'
import { connect } from 'react-redux'
import { togglePatientSider } from '../actions'
import { popupAddPatient, setActivePatient } from '../actions/patientList'

import SliderComponent from '../components/PatientListSlider'

const mapStateToProps = ({ leftNav }) => ({
  isOpenSliderNav: leftNav.isOpenSliderNav,
})

export default connect(
  mapStateToProps,
  {
    togglePatientSider,
    popupAddPatient,
    setActivePatient,
  },
)(SliderComponent)

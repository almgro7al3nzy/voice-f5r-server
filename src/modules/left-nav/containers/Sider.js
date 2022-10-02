// import React from 'react'
import { connect } from 'react-redux'
import { togglePatientSider } from '../actions'

import SiderComponent from '../components/Sider'

const mapStateToProps = ({ leftNav }) => ({
  selectedKeys: leftNav.selectedKeys,
  isOpenSliderNav: leftNav.isOpenSliderNav,
})

const Sider = connect(
  mapStateToProps,
  { togglePatientSider },
)(SiderComponent)

export default Sider

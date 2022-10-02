// import get from 'lodash/get'

export const setSelectedKeys = locationPath =>
  (dispatch, getState) => {
    const isOpenSliderNav = getState().leftNav.isOpenSliderNav
    let selectedKeys = ['home']
    if (isOpenSliderNav) {
      selectedKeys = ['patient']
    } else if (locationPath === '/settings') {
      selectedKeys = ['settings']
    }
    dispatch({
      type: 'CHANGE_LEFTNAV_PROPERTY',
      selectedKeys,
    })
  }

export const togglePatientSider = () =>
  (dispatch, getState) => {
    const { isOpenSliderNav } = getState().leftNav
    dispatch({
      type: 'CHANGE_LEFTNAV_PROPERTY',
      isOpenSliderNav: !isOpenSliderNav,
    })
  }

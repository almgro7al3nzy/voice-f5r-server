import { connect } from 'react-redux'
import HomeComponent from '../components'
import { popupAddOperation } from '../actions/index.js'

export default connect(null, {
  popupAddOperation,
})(HomeComponent)

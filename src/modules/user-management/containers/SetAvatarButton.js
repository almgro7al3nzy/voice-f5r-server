import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import SetAvatarButton from '../components/SetAvatarButton'
import { resetStore } from '../actions'

const mapStateToProps = state => ({
  userInfo: state.core.userInfo,
})

export default withApollo(connect(mapStateToProps, { resetStore })(SetAvatarButton))

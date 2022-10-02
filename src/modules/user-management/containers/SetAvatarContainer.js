// import { withApollo } from 'react-apollo'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import SetAvatarContainer from '../components/SetAvatarContainer'
import { resetStore } from '../actions'
import {
  updateAvatarForHealthCareProfessional,
  updateAvatar } from '../actions/updateHealthCareProfessional'

const SetAvatar = graphql(updateAvatarForHealthCareProfessional, {
  props: ({ mutate }) => ({
    setAvatar(avatarImageData) {
      return mutate({
        variables: {
          avatarImageData,
        },
      })
    },
  }),
})

const mapStateToProps = state => ({
  userInfo: state.core.userInfo,
})

export default compose(
  SetAvatar,
  connect(mapStateToProps, { resetStore, updateAvatar }),
)(SetAvatarContainer)

import React, { PropTypes } from 'react'
import { Button } from 'antd'

class Operations extends React.Component {
  static propTypes = {
    currentItem: PropTypes.object,
    popupUpdateHealthCareProfessional: PropTypes.func,
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    const { currentItem, popupUpdateHealthCareProfessional } = this.props
    return (<div>
      <Button
        onClick={() => popupUpdateHealthCareProfessional(currentItem)}
      >编辑</Button>
    </div>)
  }
}

export default Operations

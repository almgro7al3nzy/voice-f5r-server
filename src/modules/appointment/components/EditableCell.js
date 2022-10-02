import React, { PropTypes } from 'react'
import { Input } from 'antd'
import { StyledContainer, StyledIcon } from './styled-components'

export default class EditableCell extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    handleSave: PropTypes.func.isRequired,
  }
  state = {
    value: this.props.value,
    editable: false,
  }
  componentWillReceiveProps(np) {
    if (np.value !== this.props.value) {
      this.setState({
        value: np.value,
      })
    }
  }
  handleChange = (e: any) => {
    const value = e.target.value
    this.setState({ value })
  }
  check = () => {
    this.setState({ editable: false })
    if (this.props.handleSave) {
      this.props.handleSave(this.state.value)
    }
  }
  edit = () => {
    this.setState({ editable: true })
  }
  render() {
    const { value, editable } = this.state
    return (
      <StyledContainer>
        {
          editable ?
            <div style={{ paddingRight: '24px' }}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <StyledIcon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div style={{ padding: '5px 24px 5px 5px' }}>
              {value || ' '}
              <StyledIcon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </StyledContainer>
    )
  }
}

import styled from 'styled-components'
import React, { PropTypes } from 'react'
import { Button } from 'antd'

class CorpusCreator extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    segment: PropTypes.string.isRequired,
    dependence: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  }
  state = {
    editing: false,
    value: '',
  }
  openLid() {
    this.setState({ editing: true })
  }
  closeLid() {
    this.setState({ editing: false })
  }
  save() {
    const { category, segment, dependence, onSubmit } = this.props
    const value = this.state.value
    onSubmit({ category, segment, dependence, value }, () => this.closeLid())
  }
  renderEditor() {
    return (
      <Wrapper>
        <Input autoFocus onChange={e => this.setState({ value: e.target.value })} />
        <StyledButton type="primary" size="small" onClick={() => this.save()}>
          提交
        </StyledButton>
      </Wrapper>
    )
  }
  renderLid() {
    return (
      <Wrapper>
        <Lid onClick={() => this.openLid()}>添加自定义描述</Lid>
      </Wrapper>
    )
  }
  render() {
    return this.state.editing ? this.renderEditor() : this.renderLid()
  }
}

export default CorpusCreator

const Wrapper = styled.div`
  flex: 0 0 26px;
  padding: 3px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  border-radius: 0 0 4px 4px;
  border: 1px solid ${props => props.theme.general.color.TITLE};
`
const Lid = styled.div`
  color: '#ddd';
  cursor: pointer;
`

const Input = styled.input`flex: 1 1;`

const StyledButton = styled(Button)`
  margin-left: 6px;
  height: 20px;
`

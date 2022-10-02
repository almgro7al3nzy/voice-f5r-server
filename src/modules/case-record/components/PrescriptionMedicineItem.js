import React, { PropTypes } from 'react'
import styled from 'styled-components'

class PrescriptionMedicineItem extends React.Component {
  state = {}
  render() {
    console.log('状态', this.props.status)
    switch (this.props.status) {
      case 'add':
        return (
          <div>
            <FlexDiv style={{ color: '#4A96DE' }}>{`【新】${this.props.name}\t${
              this.props.dosage
            }\tmg\t${this.props.usage}`}</FlexDiv>
          </div>
        )
      case 'extend':
        return (
          <div>
            <FlexDiv>{`${this.props.name}\t${this.props.dosage}\tmg\t${this.props.usage}`}</FlexDiv>
          </div>
        )
      case 'modify':
        return (
          <div>
            <FlexDiv style={{ color: '#B45278' }}>{`【调】${this.props.name}\t${
              this.props.dosage
            }\tmg\t${this.props.usage}`}</FlexDiv>
          </div>
        )
      case 'stop':
        return (
          <div>
            <FlexDiv style={{ color: '#fff', backgroundColor: '#909090' }}>{`【停】${
              this.props.name
            }\t${this.props.dosage}\tmg\t${this.props.usage}`}</FlexDiv>
          </div>
        )
      default:
        return (
          <div>
            <FlexDiv>{`${this.props.name}\t${this.props.dosage}\tmg\t${this.props.usage}`}</FlexDiv>
          </div>
        )
    }
  }
}

PrescriptionMedicineItem.propTypes = {
  name: PropTypes.string,
  dosage: PropTypes.string,
  usage: PropTypes.string,
  status: PropTypes.string,
}

const FlexDiv = styled.span`
  padding-right: 5px;
`

export default PrescriptionMedicineItem

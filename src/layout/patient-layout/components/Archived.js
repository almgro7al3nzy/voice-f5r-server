import React, { PropTypes } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import { queryPatientById } from '../actions'

class Archived extends React.Component {
  state = {

  }
  handleSaveBtn = () => {
    const { patientId, mutationUpdateTheFileManger } = this.props
    const mutate = mutationUpdateTheFileManger
    mutate({
      variables: {
        patientId,
      },
      refetchQueries: [{
        query: queryPatientById,
        variables: {
          patientId,
        },
      }],
    })
  }
  render() {
    const { patient } = this.props.data
    const fileInfo = get(patient, 'boundDetails.archivedManagement')
    if (!fileInfo) return null
    return (
      <ArchivedStyle>
        <FlexContainer>
          <BigLabel>  该患者已经归档！</BigLabel>
          <SmallLabel>归档原因:</SmallLabel>
          <SmallLabelInfo>{fileInfo}</SmallLabelInfo>
          <UseBtn onClick={this.handleSaveBtn}>重新启用</UseBtn>
        </FlexContainer>
      </ArchivedStyle>
    )
  }
}

const ArchivedStyle = styled.div`
  position: sticky;
  bottom: 20px;
  background-color: rgb(255, 254, 239);
  height: 64px;
  justify-content: space-between;git 
  align-items: center;
`

const FlexContainer = styled.div`
  display:flex;
  height: 100%;
  align-items: center;
`
const BigLabel = styled.span`
  font-size: 24px;
  margin-left: 30px;
  color : #26344b;
`
const SmallLabel = styled.span`
font-size: 14px;
color : #26344b;
`
const SmallLabelInfo = styled.span`
font-size: 14px;
color : #26344b;
flex: 1 1 auto;
`

const UseBtn = styled(Button) `
font-size: 14px;
margin-right: 50px;
color : white;
background-color: #00838f;
`

Archived.propTypes = {
  data: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  mutationUpdateTheFileManger: PropTypes.string.isRequired,
}
export default Archived


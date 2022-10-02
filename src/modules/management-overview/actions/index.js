import { gql } from 'react-apollo'
import React from 'react'
import styled from 'styled-components'
import ListContaner from '../components/ListContaner.js'
import { unMeasureMapping } from '../constants'

export const alertUnmeasurePatientsList = (props, UnmeasurdPatients, value) => (dispatch) => {
  let cardName = ''
  if (value === 1) {
    cardName = '7日内有测量'
  } else if (value === 2) {
    cardName = '7日内血压超标'
  } else {
    cardName = null
  }
  dispatch({
    type: 'MODAL_SHOW',
    isShowModal: true,
    title: <TitleDiv>
      <TitlePatientNums>{UnmeasurdPatients.length}</TitlePatientNums>
      <TitlePatientDate>
        人{cardName || unMeasureMapping[props.timeChoose]}
      </TitlePatientDate>
    </TitleDiv>,
    width: 400,
    maskClosable: false,
    content: <ListContaner UnmeasurdPatients={UnmeasurdPatients} {...props} />,
  })
}

const TitlePatientNums = styled.span`
  font-size: 36px;
  color: #25354b;
  display: inline-block;
  margin-right: 6px;
  font-family: HelveticaNeue;
`
const TitlePatientDate = styled.span`
  font-size: 12px;
  color: #666666;
  display: inline-block;
  font-family: PingFangSC-Regular;
`
const TitleDiv = styled.div`
  margin-top: 10px;
`
export const queryPatientsAndOverproof = gql`
  query GetAllPatientsAndOverproof {
    me {
      _id
      ... on HealthCareProfessional {
        healthCareTeams {
          ... on HealthCareTeam {
            patients {
              ... on Patient {
                _id
                fullName
                avatar
                createdAt
                boundDetails {
                  healthCareTeamId
                  gender
                  dateOfBirth
                  hypertensionLevel
                  isStarred
                  archivedManagement
                }
              }
            }
            unmeasurePatientsList {
              ThreeToSevenDaysUnmeasure {
                _id
                fullName
                avatar
                boundDetails {
                  gender
                  dateOfBirth
                  hypertensionLevel
                  archivedManagement
                }
              }
              SevenToFourteenDaysUnmeasure {
                _id
                fullName
                avatar
                boundDetails {
                  gender
                  dateOfBirth
                  hypertensionLevel
                  archivedManagement
                }
              }
              ExceedFourteenDaysUnmeasure {
                _id
                fullName
                avatar
                boundDetails {
                  gender
                  dateOfBirth
                  hypertensionLevel
                  archivedManagement
                }
              }
              SevenDaysMeasure
              SevenDaysOverproof
            }
          }
        }
      }
    }
  }`

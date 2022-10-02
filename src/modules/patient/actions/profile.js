import { gql } from 'react-apollo'
import React from 'react'
import AddPatient from '../../add-patient/containers'
import FileAlert from '../components/FileAlert.js'

export const popupEditPatient = patientInfo => (dispatch) => {
  const { fullName } = patientInfo
  dispatch({
    type: 'MODAL_SHOW',
    title: `编辑${fullName}`,
    isShowModal: true,
    maskClosable: false,
    content: <AddPatient patientInfo={patientInfo} />,
    width: 1140,
  })
}

export const addFileAlert = props => (dispatch) => {
  dispatch({
    type: 'MODAL_SHOW',
    title: '确认归档操作',
    isShowModal: true,
    maskClosable: false,
    width: 350,
    content: <FileAlert props={props} />,
  })
}

export const openChatRoom = () => (dispatch, getState) => {
  const { patientId } = getState().core.activedPatient
  const { patients } = getState().chat
  if (Object.keys(patients).length < 4) {
    dispatch({
      type: 'OPEN_CHAT_WINDOW',
      patientId,
    })
  } else {
    dispatch({
      type: 'MODAL_SHOW',
      isShowModal: true,
      title: '提示',
      width: 300,
      content: (
        <span>您好，系统只允许同时打开4个聊天窗口，请先关闭几个已打开的聊天窗口后再操作</span>
      ),
    })
  }
}

export const mutationUpdatePatientAsHCPForStarred = gql`
  mutation UpdatePatientAsHCPForStarred($patientId: ID!, $isStarred: Boolean!) {
    updatePatientAsHCPForStarred(patientId: $patientId, isStarred: $isStarred)
  }
`
export const mutationAddThePatientRemark = gql`
  mutation AddThePatientRemark($patientId: ID!, $patientRemark: String!) {
    addThePatientRemark(patientId: $patientId, patientRemark: $patientRemark)
  }
`
export const mutationAddTheFileManger = gql`
  mutation AddTheFileManger($patientId: ID!, $archivedManagement: String!) {
    addTheFileManger(patientId: $patientId, archivedManagement: $archivedManagement)
  }
`
export const queryPatientArchiveById = gql`
  query queryPatientById($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      boundDetails {
        archivedManagement
      }
    }
  }
`
export const queryPatients = gql`
  query GetAllPatients {
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
                  gender
                  dateOfBirth
                  hypertensionLevel
                  isStarred
                  archivedManagement
                  groupStatus {
                    type
                    changeTime
                    compareLast
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const queryPatientById = gql`
  query GetActivedPatientProfile($patientId: ID!) {
    me {
      _id
      ... on HealthCareProfessional {
        healthCareTeams {
          patient(id: $patientId) {
            _id
            fullName
            avatar
            mobile
            createdAt
            leaderOfHealthCareTeam {
              fullName
              role
              healthCareTeamId
              avatar
              _id
            }
            device {
              model
              appVersion
              systemName
              systemVersion
              jsVersion
            }
            boundDetails {
              gender
              dateOfBirth
              height
              weight
              HISNumber
              healthInsuranceType
              averageMonthlyFamilyIncome
              highestEducationLevel
              isStarred
              employmentStatus
              emergencyContact {
                fullName
                mobile
                relationshipToPatient
              }
              permanentPlaceOfRecidence {
                province
                municipality
                area
                provinceCode
                municipalityCode
                areaCode
                addressDetail
              }
              measurementDeviceStatus
              idCard
              patientRemark
              archivedManagement
              identityInfo {
                IDNumber
                identityType
              }
            }
          }
        }
      }
    }
  }
`
export default queryPatientById

import React, { PropTypes } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'
import omit from 'lodash/omit'
import get from 'lodash/get'
import { TabsLayout } from '../../../layout/patient-layout/components'
import { Tips } from './styled-components'
import { EmptyContent, SoapContent } from './Content'
// import { NewButton } from './Button'

import { Tabs } from './Tabs'
import { Title } from './Title'
import EditModal from '../containers/EditModal'

class ViewModal extends React.Component {
  static propTypes = {
    patientId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    popupEditSoap: PropTypes.func.isRequired,
    querySoapOfachive: PropTypes.func.isRequired,
  }
  state = {
    activeSoapId: null,
  }

  componentWillMount() {
    this.props.data.refetch({ patientId: this.props.patientId })
  }

  changeActiveSoap(soapId) {
    this.setState({ activeSoapId: soapId })
  }

  render() {
    let title = Title({})
    const buttons = []
    let isAddBtnEditable = false
    const activeSoapId = this.state.activeSoapId
    const { patient, loading } = this.props.data
    const { querySoapOfachive } = this.props
    const { boundDetails } = querySoapOfachive
    const fullName = get(this.props, 'queryLoginRole.me.fullName')
    // const role = get(this.props,
    //  'queryLoginRole.me.healthCareTeams[0].healthCareProfessionals[0].role')
    const isEditing = boundDetails ? boundDetails.archivedManagement : ''
    let content = EmptyContent({})
    if (!loading) {
      const {
        availableFollowUps,
        medicalHistoryExists,
        soaps,
      } = patient
      const patientDesc = get(patient, 'currentDayCaseRecord.patientDesc.description')
      const bodyCheckup = get(patient, 'currentDayCaseRecord.bodyCheckup.description')
      const diagnosis = get(patient, 'currentDayCaseRecord.diagnosis.description')
      const medicines = get(patient, 'currentDayCaseRecord.prescription.medicines') || []
      const objective = []
      if (bodyCheckup) objective.push(bodyCheckup)
      if (diagnosis) objective.push(diagnosis)
      if (medicines.length) {
        medicines.forEach(medicine =>
          objective.push(`${medicine.name},${medicine.dosage},${medicine.usage}`),
        )
      }
      if (soaps && soaps.length > 0) {
        // 在soap中过滤出今天的soap,有得话。在看人一不一样，没有得话，直接创建，有得话不可以创建了
        const todaySoaps = soaps.filter(o => moment().isSame(o.createdAt, 'day'))
        // 在今天得soap数组里面去过滤，有没有当前登陆得这个人，有得话。isAddBtnEditable = true
        const soapRole = todaySoaps.filter(o => o.createdBy.fullName.indexOf(fullName) !== -1)
        if (soapRole.length > 0) {
          isAddBtnEditable = true
        }
      }
      const newSoap = {}
      if (patientDesc) newSoap.subjective = patientDesc
      if (objective.length) newSoap.objective = objective.join('\n')
      content = EmptyContent({
        medicalHistoryExists,
        onClickAddSoap: () =>
          this.props.popupEditSoap(<EditModal soap={newSoap} />),
        isEditing,
      })

      if (availableFollowUps && availableFollowUps.length) {
        title = Title({ ...availableFollowUps[0] })
      }
      // if (medicalHistoryExists) {
      buttons.push(
        <Btn
          icon="file-add"
          onClick={() => this.props.popupEditSoap(<EditModal soap={newSoap} />)}
          disabled={isEditing || isAddBtnEditable}
        >添加SOAP
          </Btn>,
      )
      // }
      if (soaps && soaps.length) {
        const activeSoap = activeSoapId ? find(soaps, { _id: activeSoapId }) : soaps[0]

        if (this.state.activeSoapId !== activeSoapId) {
          this.setState({ activeSoapId })
        }
        if (!activeSoap.overdue) {
          buttons.push(
            <Btn
              disabled={isEditing}
              icon="edit"
              onClick={() => {
                const cloneSoap = cloneDeep(activeSoap)
                const washedSoap = {
                  ...omit(cloneSoap, [
                    '__typename',
                    'patientId',
                    'overdue',
                    'category',
                    'selectedAssessment',
                  ]),
                  createdBy: {
                    ...omit(cloneSoap.createdBy, '__typename'),
                  },
                  severity: {
                    ...omit(cloneSoap.severity, '__typename'),
                  },
                }
                this.props.popupEditSoap(<EditModal soap={washedSoap} />)
              }}
            >编辑 </Btn>,
          )
        }
        content = SoapContent({ soap: activeSoap })
      }

      const menu = Tabs({
        soaps,
        activeSoapId,
        onLableClick: soapId => activeSoapId !== soapId && this.changeActiveSoap(soapId),
      })

      return TabsLayout({ title, buttons, menu, content, addition: Tips })
    }

    return <div />
  }
}
const Btn = styled(Button) `
  color: #fff;
  border: none;
  padding-right: -5px;
  background-color: #62708b;
`
export default ViewModal

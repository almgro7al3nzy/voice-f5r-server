import React, { PropTypes } from 'react'
import get from 'lodash/get'
import moment from 'moment'
import { message } from 'antd'
import { StyledCard } from './styled-components'
import ISelect from './ISelect'
import EditableCell from './EditableCell'
import ITable from './Table'
import CardHeader from './CardHeader'
import { transformData, getAppointmentsInfo } from '../utils'
import { getAppointments, getOrderedAptDays } from '../actions'
import { columns } from '../constants'
import Operations from './Operations'

const patientProperty = ['HISNumber', 'mobile', 'fullName']

export default class AppointmentCard extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    mutate: PropTypes.func,
    selectedDay: PropTypes.string,
  }

  constructor(props) {
    super(props)
    const renderCell = ['mobile', 'fullName', 'HISNumber', 'note']
    const renderOptions = {
      source: [
        {
          key: 'OUT_PATIENT_SERVICE',
          title: '门诊',
        },
        {
          key: 'AFTERHOSTPTAL',
          title: '出院',
        },
      ],
      appointmentState: [
        {
          key: 'CONFIRMED',
          title: '已确认',
        },
        {
          key: 'UNCONFIRMED',
          title: '未确认',
        },
      ],
    }
    this.columns = columns.map((o) => {
      const temp = { ...o, dataIndex: o.key }
      if (renderCell.indexOf(o.key) !== -1) {
        temp.render = (text, record) =>
          this.renderEditableCell(text, record, o.key)
      } else if (renderOptions[o.key]) {
        temp.render = (text, record) =>
          this.renderOptions(text, record, renderOptions[o.key], o.key)
      } else if (o.key === 'status') {
        temp.render = (text) => {
          const map = {
            ADDITION: '加诊',
            FIRST: '初诊',
            QUARTER: '复诊',
          }
          return <div>{map[text]}</div>
        }
      } else if (o.key === 'operation') {
        temp.render = (text, record) => this.renderOperations(text, record)
      }
      return temp
    })
  }

  componentWillReceiveProps(np) {
    const { selectedDay } = this.props
    if (selectedDay !== np.selectedDay && np.selectedDay) {
      this.props.data.refetch({
        selectedDay: np.selectedDay || moment().format('YYYY-MM-DD'),
      })
    }
  }

  handleChange = ({
    key, value,
    appointmentId,
    patientId,
    cb,
    queries = [],
  }) => {
    const { mutate, selectedDay } = this.props
    const batch = {
      key, value,
    }
    if (patientProperty.indexOf(key) !== -1) {
      batch.patientId = patientId
    }
    mutate({
      variables: {
        appointmentId,
        batch,
      },
      refetchQueries: [
        {
          query: getAppointments,
          variables: {
            selectedDay: selectedDay || moment().format('YYYY-MM-DD'),
          },
        },
        ...queries,
      ],
    }).then(() => {
      if (typeof cb === 'function') cb()
    })
  }

  renderEditableCell = (text, record, key) => {
    const handleChange = (value) => {
      if (value !== text) {
        this.handleChange({
          appointmentId: record._id,
          patientId: record.patientId,
          key,
          value,
        })
      }
    }
    return (
      <EditableCell
        value={text}
        recordId={record._id}
        handleSave={handleChange}
      />)
  }

  renderOptions = (text, record, options, key) => {
    const handleChange = (value) => {
      if (value !== text) {
        this.handleChange({
          appointmentId: record._id,
          key,
          value,
        })
      }
    }
    return (<ISelect
      key={record._id}
      defaultValue={text}
      options={options}
      handleChange={handleChange}
      style={{ width: 80 }}
    />)
  }

  renderOperations = (text, record) => {
    const { fullName } = record
    const handleChange = (value) => {
      const formatValue = moment(value).format('YYYY-MM-DD')
      if (formatValue !== text) {
        this.handleChange({
          appointmentId: record._id,
          key: 'appointmentTime',
          value: formatValue,
          queries: [{
            query: getOrderedAptDays,
          }],
          cb: () => {
            message.success(`${fullName}已被改期至${formatValue}`, 5)
          },
        })
      }
    }
    return (<Operations
      defaultValue={record.appointmentTime}
      handleChange={handleChange}
    />)
  }

  render() {
    const Totalrecords = get(this.props.data, 'me.healthCareTeams.0.appointments', [])
    const records = Totalrecords.filter(item =>
      !get(item, 'patient.boundDetails.archivedManagement'),
    )
    const appointments = transformData(records)
    return (<StyledCard
      title="患者门诊预约表"
    >
      <div>
        <CardHeader
          appointmentDetail={getAppointmentsInfo(records)}
          selectedDay={this.props.selectedDay}
        />
        <ITable
          dataSource={appointments}
          columns={this.columns}
        />
      </div>
    </StyledCard>)
  }
}

import * as React from 'react'
import ISelect from './ISelect'
import EditableCell from './EditableCell'
import ITable from './Table'

export default class Appointment {
  onLoadData = () => {
    console.log(this)
    return {
      dataSource: [
        {
          _id: '11',
          status: 'FIRST',
          name: 'karose',
          hisNumber: '100181',
          mobile: '18612201226',
          source: 'OUT_PATIENT_SERVICE',
          appointmentState: 'UNCONFIRMED',
          note: '最近有点忙',
          appointmentTime: '2018-01-18',
        },
        {
          _id: '12',
          name: 'karose1',
          status: 'ADDITION',
          hisNumber: '100182',
          mobile: '18612200000',
          source: 'AFTERHOSTPTAL',
          appointmentState: 'CONFIRMED',
          note: '忙的有点不行了',
          appointmentTime: '2018-01-18',
        },
      ],
    }
  }
  getConfig = () => {
    console.log(this)
    return {
      columns: [
        {
          title: '诊态',
          key: 'status',
          render: (text) => {
            const map = {
              ADDITION: '加诊',
              FIRST: '初诊',
            }
            return <div>{map[text]}</div>
          },
        },
        {
          title: '姓名',
          key: 'name',
          width: 140,
          render: (text, record) => {
            const handleChange = (data: any) => {
              console.log(data)
            }
            return (<EditableCell
              value={text}
              recordId={record._id}
              handleChange={handleChange}
            />)
          },
        },
        {
          title: '病历号',
          key: 'hisNumber',
        },
        {
          title: '电话',
          key: 'mobile',
        },
        {
          title: '来源',
          key: 'source',
          render: (text: any) => {
            const options = [
              {
                key: 'OUT_PATIENT_SERVICE',
                title: '门诊',
              },
              {
                key: 'AFTERHOSTPTAL',
                title: '出院',
              },
            ]
            return (<ISelect
              defaultValue={text}
              options={options}
            />)
          },
        },
        {
          title: '预约状态',
          key: 'appointmentState',
          render: (text: any) => {
            const options = [
              {
                key: 'CONFIRMED',
                title: '已确认',
              },
              {
                key: 'UNCONFIRMED',
                title: '未确认',
              },
            ]
            return (<ISelect
              defaultValue={text}
              options={options}
            />)
          },
        },
        {
          title: '备注',
          key: 'note',
        },
      ],
    }
  }
  render() {
    const { dataSource } = this.onLoadData()
    let { columns } = this.getConfig()
    columns = columns.map(o => ({ ...o, dataIndex: o.key }))
    return <ITable dataSource={dataSource} columns={columns} />
  }
}

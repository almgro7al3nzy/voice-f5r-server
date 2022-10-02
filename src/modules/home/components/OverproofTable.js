import moment from 'moment'
import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Table } from 'antd'
import getRows from './format-table-data.js'

const OverproofTable = (props) => {
  const { data } = props
  const tableData = data.me ? getRows(data.me.healthCareTeams[0]) : []
  const setColor = (obj) => {
    const color = obj.colors.BPLEVEL.color
    switch (color) {
      case '#5EB300': {
        return 'bloodcolor1 rowBasic'
      }
      case '#F5A623': {
        return 'bloodcolor2 rowBasic'
      }
      case '#FA7252': {
        return 'bloodcolor3 rowBasic'
      }
      case '#E50037': {
        return 'bloodcolor4 rowBasic'
      }
      case '#AD1457': {
        return 'bloodcolor5 rowBasic'
      }
      case '#79B0EC': {
        return 'bloodcolor6 rowBasic'
      }
      default:
        return 'bloodcolor1'
    }
  }
  function renderAction(text, row) {
    const obj = {
      children: '',
      props: {},
    }
    if (row.type) {
      obj.props.colSpan = 0
    } else if (row.BloodPressureValue === text) {
      obj.children = `${text}`
      obj.props.className = setColor(row)
      return (<div>
        <span style={{ color: row.colors.HPLEVEL.color, textAlign: 'center', fontSize: '18px' }}>{row.HPressureValue}</span>
        <span style={{ color: row.colors.LPLEVEL.color, textAlign: 'center', fontSize: '18px' }}>{row.VPressureValue}</span>
      </div>)
    } else if (row.state === text) {
      if (row.state > 0) {
        obj.children = <span style={{ color: '#5690c0' }}>未处理</span>
        //  <HandleButton className="rowhandle"
        //  onClick={() => popupAddOperation(row)} >已处理</HandleButton>
      } else {
        obj.children = <span>已处理</span>
        // <HandleButton className="handleButton"
        //  onClick={() => popupAddOperation(row)} >未处理</HandleButton>
      }
    } else {
      obj.children = `${text}`
    }
    return obj
  }

  const tableColumns = [
    {
      title: '姓名',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '95px',
      className: 'bloodName',
      render(text, row) {
        if (text) {
          const path = `/patient/${row.patientId}/blood-pressure`
          return <TablePatientName onClick={() => { window.open(path, '_blank') }}>{text}</TablePatientName>
        }
        return {
          children: row.value,
          props: {
            colSpan: 5,
            className: 'dataRow',
          },
        }
      },
    }, {
      title: '测量值',
      dataIndex: 'BloodPressureValue',
      key: 'BloodPressureValue',
      width: '115px',
      className: 'bloodValue',
      render: renderAction,
    }, {
      title: '测量时间',
      width: '160px',
      className: 'bloodT',
      dataIndex: 'measuredAt',
      key: 'measuredAt',
      render: renderAction,
      sorter: (a, b) => +moment(a.sortTime).format('x') - +moment(b.sortTime).format('x'),
    }, {
      title: '状态',
      dataIndex: 'state',
      width: '60px',
      className: 'rowhandle',
      key: 'state',
      render: renderAction,
      sorter: (a, b) => a.state - b.state,
    },
  ]
  return (
    <div>
      <Table
        className="tableTh tableTd tableStyle"
        columns={tableColumns}
        dataSource={tableData}
        bordered
        pagination={{ pageSize: 11 }}
        useFixedHeader
      />
    </div>
  )
}
// const HandleButton = styled.div`
// color: #5690c0;
// cursor:pointer;`

const TablePatientName = styled.span`
color: #5690c0;
cursor: pointer;
`

OverproofTable.propTypes = {
  // popupAddOperation: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}
export default OverproofTable

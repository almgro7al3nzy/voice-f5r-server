import React, { PropTypes } from 'react'
import { Table, Button } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import orderBy from 'lodash/orderBy'
import '../constants/physical-examination.css'


const getBMI = (height, weight) => {
  if (!height || !weight) {
    return '---'
  }
  return (weight / ((height / 100) * (height / 100))).toFixed(1)
}

const getWaistHipRatio = (waistline, hipline) => {
  if (!waistline || !hipline) {
    return '---'
  }
  return (waistline / hipline).toFixed(1)
}


const showData = (physicalExaminations) => {
  const datas = []
  if (physicalExaminations && physicalExaminations.length > 0) {
    const sortByP = orderBy(physicalExaminations, o => o.physicalExaminationTime, 'desc')
    sortByP.forEach((item) => {
      const data = {
        rowKey: item._id,
        physicalExaminationTime: moment(item.physicalExaminationTime, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        height: item.height,
        weight: item.weight,
        BMI: getBMI(item.height, item.weight),
        sitLeftBloodPressure: `${item.sitLeftBloodPressure.systolic}/${item.sitLeftBloodPressure.diastolic}/${item.sitLeftBloodPressure.pulse}`,
        sitRightBloodPressure: `${item.sitRightBloodPressure.systolic}/${item.sitRightBloodPressure.diastolic}/${item.sitRightBloodPressure.pulse}`,
        stationLeftBloodPressure: item.stationLeftBloodPressure ? `${item.stationLeftBloodPressure.systolic}/${item.stationLeftBloodPressure.diastolic}/${item.stationLeftBloodPressure.pulse}` : '---',
        stationRightBloodPressure: item.stationRightBloodPressure ? `${item.stationRightBloodPressure.systolic}/${item.stationRightBloodPressure.diastolic}/${item.stationRightBloodPressure.pulse}` : '---',
        waistline: item.waistline,
        hipline: item.hipline,
        waistToHipRatio: getWaistHipRatio(item.waistline, item.hipline),
        physicalExamination: item,
        // sitLeftBloodPressure:
      }
      datas.push(data)
    })
  }
  return datas
}

const PhysicalExaminationTable = (props) => {
  const { popupAddPhysicalExamination, age } = props
  const datas = showData(props.physicalExaminations)
  const tableColumns = [
    {
      title: '时间',
      dataIndex: 'physicalExaminationTime',
      key: 'physicalExaminationTime',
      className: 'physicalExaminationTime',
    }, {
      title: '身高cm',
      dataIndex: 'height',
      className: 'physicalExaminationBase',
      key: 'height',
    }, {
      title: '体重kg',
      className: 'physicalExaminationBase',
      dataIndex: 'weight',
      key: 'weight',
    }, {
      title: 'BMI',
      dataIndex: 'BMI',
      key: 'BMI',
      className: 'physicalExaminationBMI',
    }, {
      title: '诊室血压坐位左臂',
      dataIndex: 'sitLeftBloodPressure',
      key: 'sitLeftBloodPressure',
      className: 'physicalExaminationLong',
    }, {
      title: '诊室血压坐位右臂',
      dataIndex: 'sitRightBloodPressure',
      key: 'sitRightBloodPressure',
      className: 'physicalExaminationLong',
    }, {
      title: '诊室血压站位左臂',
      dataIndex: 'stationLeftBloodPressure',
      key: 'stationLeftBloodPressure',
      className: 'physicalExaminationLong',
    }, {
      title: '诊室血压站位右臂',
      dataIndex: 'stationRightBloodPressure',
      className: 'physicalExaminationLong',
      key: 'stationRightBloodPressure',
    }, {
      title: '腰围cm',
      dataIndex: 'waistline',
      key: 'waistline',
      className: 'physicalExaminationBase',
    }, {
      title: '臀围cm',
      dataIndex: 'hipline',
      key: 'hipline',
      className: 'physicalExaminationBase',
    }, {
      title: '腰臀比',
      dataIndex: 'waistToHipRatio',
      key: 'waistToHipRatio',
      className: 'physicalExaminationRatio',
    }, {
      title: '操作',
      dataIndex: '_id',
      key: '_id',
      render: (text, record) =>
        // if (moment().diff(moment(record.physicalExamination.createdAt), 'hours') > 24) {
        //   return (<Btn
        //     disabled
        //     icon="edit"
        //     onClick={() => popupAddPhysicalExamination(record.physicalExamination, age)}
        //   />)
        // }
        (<Btn
          icon="edit"
          onClick={() => popupAddPhysicalExamination(1, record.physicalExamination, age)}
        />),
    },
  ]
  return (
    <TableDiv>
      <Table
        className="physicalExamination"
        columns={tableColumns}
        dataSource={datas}
        bordered
        pagination={false}
        scroll={{ y: 500 }}
        useFixedHeader
      />
    </TableDiv>)
}

const TableDiv = styled.div`
float: center;
th {
  text-align:center !important;
}
`

const Btn = styled(Button) `
margin-top: 10px;
border: none;
`

PhysicalExaminationTable.propTypes = {
  physicalExaminations: PropTypes.array.isRequired,
  popupAddPhysicalExamination: PropTypes.func.isRequired,
  age: PropTypes.number.isRequired,
}

export default PhysicalExaminationTable

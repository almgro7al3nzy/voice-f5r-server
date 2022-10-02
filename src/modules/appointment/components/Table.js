import React, { PropTypes } from 'react'
import { Table } from 'antd'
import { TableContainer } from './styled-components'

const ITable = ({ dataSource, columns }) =>
(<TableContainer>
  <Table
    locale={{
      emptyText: '暂无数据',
    }}
    bordered
    dataSource={dataSource}
    columns={columns}
  />
</TableContainer>)

ITable.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array.isRequired,
}
export default ITable

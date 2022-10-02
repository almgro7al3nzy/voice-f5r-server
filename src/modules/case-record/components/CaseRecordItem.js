import React, { PropTypes } from 'react'
import { Tabs } from 'antd'

const TabPane = Tabs.TabPane

const CaseRecordItem = (props) => {
  const { content = {} } = props
  if (content) {
    console.log(content)
  }
  return (
    <TabPane tab={content.caseRecordDate} key={content._id}>
      {content.patientId}
    </TabPane>
  )
}

CaseRecordItem.propTypes = {
  content: PropTypes.object,
}

export default CaseRecordItem

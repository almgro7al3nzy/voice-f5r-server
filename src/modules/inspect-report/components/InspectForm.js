import React, { PropTypes } from 'react'
import get from 'lodash/get'
import { Card, Icon, Row, Col, Popconfirm } from 'antd'
// import { Input, Table, Button, Alert } from 'antd'
// import debounce from 'lodash/debounce'
import differenceBy from 'lodash/differenceBy'
import orderBy from 'lodash/orderBy'
// import cloneDeep from 'lodash/cloneDeep'
// import omit from 'lodash/omit'
import styled from 'styled-components'
import { queryInspectReportById } from '../actions/queries'
// import './tableHeadStyle.css'
import { Screen, ContentLabel, DashedLine } from './styled-components'

const ispectMapping = {
  biochemistry: '血检检验报告',
  colorDoppler: '尿检检验报告',
  immune: '心电图检验报告',
  tempInspect: '24小时动态血压',
  ultrasonicInspect: '超声检验报告',
  otherInspect: '其他检验报告',
}

const inspectList = [
  { key: 'biochemistry', value: '血检检验报告' },
  { key: 'colorDoppler', value: '尿检检验报告' },
  { key: 'immune', value: '心电图检验报告' },
  { key: 'tempInspect', value: '24小时动态血压' },
  { key: 'ultrasonicInspect', value: '超声检验报告' },
  { key: 'otherInspect', value: '其他检验报告' },
]


const InspetForm = ({
  inspectData,
  activeKey,
  queryType,
  patientId,
  mutationRemoveInspectReport,
  mutationAddInspectReport,
  openImage,
}) => {
  const deleteInspect = ({ inspectId }) => {
    if (inspectId) {
      const options = {
        variables: {
          inspectId,
        },
        refetchQueries: [{
          query: queryInspectReportById,
          variables: {
            patientId,
            queryType: inspectData.inspectedAt ? 'DATE' : 'TYPE',
          },
        }],
      }
      mutationRemoveInspectReport(options).then(() => {
        console.log('remove is ok')
      })
    }
  }

  const saveInpect = ({ type, base64EncodedImageData }) => {
    const mutate = mutationAddInspectReport
    const options = {
      variables: {
        patientId,
        type: inspectData.type || type,
        inspectedAt: inspectData.inspectedAt ? activeKey : type,
        base64EncodedImageData,
      },
      refetchQueries: [{
        query: queryInspectReportById,
        variables: {
          patientId,
          queryType: inspectData.inspectedAt ? 'DATE' : 'TYPE',
        },
      }],
    }

    mutate(options).then(() => {
      console.log('is ok')
    })
  }

  const imageList = get(inspectData, 'imageList', [])
  const otherInspectKeyList = differenceBy(inspectList, imageList, 'key')
  const randomInput = Math.random()
  return (
    <ContainerPage>
      <div>
        {
          orderBy(imageList, 'key', 'desc').map(record => (<Screen key={record.key}>
            <ContentLabel>
              {ispectMapping[record.key] || record.key}
              <label htmlFor={`image${record.key}`}>上传文件<Icon type="upload" /></label>
              <input
                id={`image${record.key}`}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                capture="Camera"
                onChange={(e) => {
                  const reader = new FileReader()
                  reader.onload = (x) => {
                    saveInpect({
                      type: record.key,
                      base64EncodedImageData: x.target.result,
                    })
                  }
                  reader.readAsDataURL(e.target.files.item(0))
                }}
              />
            </ContentLabel>
            <DashedLine />
            <Row className="custom-image">
              {
                record.images.map(image => (
                  <Col key={image._id} span={4}>
                    <Card style={{ margin: '5px' }} bodyStyle={{ padding: 5 }}>
                      <Popconfirm title="确定删除该检验报告吗？" onConfirm={() => deleteInspect({ inspectId: image._id })}>
                        <Icon type="close" />
                      </Popconfirm>
                      <img
                        alt="example"
                        width="100%"
                        style={{ cursor: 'pointer' }}
                        src={image.imageUrl}
                        onClick={() => openImage(image.imageUrl)}
                      />
                    </Card>
                  </Col>
                ))
              }
            </Row>

          </Screen>),
          )
        }
        {
          queryType === 'DATE' &&
          orderBy(otherInspectKeyList, 'key', 'asc').map(item => (<Screen>
            <ContentLabel>
              {item.value}
              <label id={randomInput} htmlFor={`image${item.key}-${randomInput}`}>上传文件<Icon type="upload" /></label>
              <input
                id={`image${item.key}-${randomInput}`}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                capture="Camera"
                onChange={(e) => {
                  const reader = new FileReader()
                  reader.onload = (x) => {
                    saveInpect({
                      type: item.key,
                      base64EncodedImageData: x.target.result,
                    })
                  }
                  reader.readAsDataURL(e.target.files.item(0))
                }}
              />
            </ContentLabel>
          </Screen>))
        }
      </div>
    </ContainerPage>
  )
}

const ContainerPage = styled.div`
  background: #ffffff;
  padding: 10px;
  overflow: auto;
  height: calc(100vh - 210px);
`

InspetForm.propTypes = {
  mutationAddInspectReport: PropTypes.func.isRequired,
  mutationRemoveInspectReport: PropTypes.func.isRequired,
  openImage: PropTypes.func.isRequired,
  patientId: PropTypes.string,
  inspectData: PropTypes.object.isRequired,
  // inspectedAt: PropTypes.string,
  activeKey: PropTypes.string,
  queryType: PropTypes.string,
}
export default InspetForm

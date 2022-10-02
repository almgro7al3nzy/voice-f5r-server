import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Radio, Button, Select } from 'antd'
import { SOAP_CATEGORY } from '../constants'
import ItemEditor from '../components/ItemEditor'
/* eslint-disable */
const Option = Select.Option

const EditModal = ({
  onCategoryChange,
  onContentChange,
  onSeveritySelect,
  onCorpusSelect,
  onSubmitNewCorpus,
  onRemoveCorpus,
  onClickSave,
  closeModal,
  data,
  corpus,
  handleSelectChange,
}) => (
    <Wrapper>
      <TopRow>
        <Radio.Group
          size="large"
          value={data.category}
          onChange={e => onCategoryChange(e.target.value)}
        >
          {SOAP_CATEGORY.map(category => (
            <Radio.Button key={category.value} value={category.value}>
              {category.text}
            </Radio.Button>
          ))}
        </Radio.Group>
        <ButtonGroup>
          <Select defaultValue={data.communicateWay ? data.communicateWay : '沟通方式'} style={{ width: 120 }} onChange={e => handleSelectChange(e)}>
            <Option value="face">面对面</Option>
            <Option value="phone">电话</Option>
            <Option value="APP">APP</Option>
            <Option value="wechat">微信</Option>
            <Option value="other">其它</Option>
          </Select>
          <Button onClick={closeModal}>取消</Button>
          <Button type="primary" disabled={data.saving} onClick={() => onClickSave()} >
            保存
         </Button>
        </ButtonGroup>
      </TopRow>
      <ItemEditor
        category={data.category}
        segment="subjective"
        onChange={onContentChange}
        onCorpusSelect={onCorpusSelect}
        onSubmitNewCorpus={onSubmitNewCorpus}
        onRemoveCorpus={onRemoveCorpus}
        content={data.subjective}
        corpus={corpus}
      />
      <ItemEditor
        category={data.category}
        segment="objective"
        onChange={onContentChange}
        onCorpusSelect={onCorpusSelect}
        onSubmitNewCorpus={onSubmitNewCorpus}
        onRemoveCorpus={onRemoveCorpus}
        content={data.objective}
        corpus={corpus}
      />
      <ItemEditor
        category={data.category}
        segment="assessment"
        hasSeverityBar
        onChange={onContentChange}
        onSeveritySelect={onSeveritySelect}
        severity={data.severity}
        onCorpusSelect={onCorpusSelect}
        onSubmitNewCorpus={onSubmitNewCorpus}
        onRemoveCorpus={onRemoveCorpus}
        content={data.assessment}
        corpus={corpus}
        selectedAssessment={data.selectedAssessment}
      />
      <ItemEditor
        category={data.category}
        segment="plan"
        onChange={onContentChange}
        onCorpusSelect={onCorpusSelect}
        onSubmitNewCorpus={onSubmitNewCorpus}
        onRemoveCorpus={onRemoveCorpus}
        content={data.plan}
        corpus={corpus}
        dependence={data.selectedAssessment}
      />
    </Wrapper>
  )

EditModal.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onSeveritySelect: PropTypes.func.isRequired,
  onSubmitNewCorpus: PropTypes.func.isRequired,
  onRemoveCorpus: PropTypes.func.isRequired,
  onCorpusSelect: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  corpus: PropTypes.array,
}

export default EditModal

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ButtonGroup = styled.div`
  > button {
    margin-left: 20px;
  }
`


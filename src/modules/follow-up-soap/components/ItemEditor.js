import React, { PropTypes } from 'react'
import styled from 'styled-components'
import filter from 'lodash/filter'
import { Icon, Popconfirm } from 'antd'
import SeverityBar from './SeverityBar'
import CorpusCreator from './CorpusCreator'

const ItemEditor = ({
  category,
  segment,
  hasSeverityBar,
  onChange,
  onSeveritySelect,
  onCorpusSelect,
  onSubmitNewCorpus,
  onRemoveCorpus,
  severity,
  content,
  corpus,
  selectedAssessment,
  dependence,
}) => {
  const filteredCorpus = filter(corpus, { category, segment, dependence: dependence || null }, [])
  return (
    <OuterWrapper>
      <ItemCode>{segment.substr(0, 1).toUpperCase()}</ItemCode>
      <SelectorWrapper>
        <Selector>
          {filteredCorpus.map(_corpus => (
            <Option key={_corpus._id} isSelected={_corpus._id === selectedAssessment}>
              <OptionContent onClick={() => onCorpusSelect(_corpus)}>{_corpus.value}</OptionContent>
              {_corpus.createdBy && (
                <Popconfirm
                  title="确定要删除这个词条吗？"
                  placement="bottomRight"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => {
                    onRemoveCorpus(_corpus._id)
                  }}
                >
                  <Trash type="delete" />
                </Popconfirm>
              )}
            </Option>
          ))}
        </Selector>
        <CorpusCreator
          category={category}
          segment={segment}
          dependence={dependence}
          onSubmit={onSubmitNewCorpus}
        />
      </SelectorWrapper>
      <ArrowRight type="arrow-right" />
      <TextAreaWrapper hasSeverityBar={hasSeverityBar}>
        {hasSeverityBar && <SeverityBar onSeveritySelect={onSeveritySelect} severity={severity} />}
        <TextArea
          onChange={(e) => {
            onChange(segment, e.target.value)
          }}
          value={content}
        />
      </TextAreaWrapper>
    </OuterWrapper>
  )
}
ItemEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSeveritySelect: PropTypes.func,
  onCorpusSelect: PropTypes.func.isRequired,
  onSubmitNewCorpus: PropTypes.func.isRequired,
  onRemoveCorpus: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  segment: PropTypes.string.isRequired,
  hasSeverityBar: PropTypes.bool,
  severity: PropTypes.object,
  content: PropTypes.string.isRequired,
  corpus: PropTypes.array,
  selectedAssessment: PropTypes.string,
  dependence: PropTypes.string,
}

export default ItemEditor

const OuterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`

const ItemCode = styled.div`
  flex: 0 0 30px;
  background-color: ${props => props.theme.general.color.TITLE};
  color: #fff;
  text-align: center;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin: 0 15px;
  line-height: 30px;
  font-size: 20px;
`
const ArrowRight = styled(Icon) `
  flex: 0 0;
  background-color: unset;
  color: ${props => props.theme.general.color.TITLE};
  margin: 0 15px;
  font-size: 20px;
`

const SelectorWrapper = styled.div`
  height: 140px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretch;
`

const Selector = styled.div`
  border-radius: 4px 4px 0 0;
  border: 1px solid ${props => props.theme.general.color.TITLE};
  border-bottom: 0;
  flex: 1 1;
  padding: 4px 0;
  overflow-y: auto;
`
const Option = styled.div`
  font-size: 12px;
  padding: 0 10px;
  cursor: pointer;
  background-color: ${props => props.isSelected && '#cfedff'};
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${props => props.theme.general.color.TITLE};
    color: #fff;
  }
`
const OptionContent = styled.div`
  flex: 1 1;
  word-break: break-all;
`
const Trash = styled(Icon) `
  flex: 0 0;
  color: white;
  font-size: 16px;
  padding: 0 6px;
  &:hover {
    color: red;
    font-weight: bold;
  }
`
const TextAreaWrapper = styled.div`
  padding: 1px;
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.general.color.TITLE};
  ${props => props.hasSeverityBar && { marginTop: '15px' }};
`
const TextArea = styled.textarea`
  padding: 5px 8px;
  flex: 1;
  border: none;
`

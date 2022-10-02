import React, { PropTypes } from 'react'
import styled from 'styled-components'
import map from 'lodash/map'
import { SOAP_CATEGORY, ASSESSMENT_SEVERITY } from '../constants'

const SeverityBar = ({ onSeveritySelect, severity }) => (
  <Wrapper>
    {SOAP_CATEGORY.map((category) => {
      const categorySeverity = ASSESSMENT_SEVERITY[severity[category.value]]
      return (
        <SeverityCategory key={category.value}>
          <SeverityCateName>{category.text}</SeverityCateName>
          <SeverityCateButton>
            <SeverityOption color={categorySeverity.color}>{categorySeverity.text}</SeverityOption>
            <Dropdown>
              {map(ASSESSMENT_SEVERITY, (obj, key) => (
                <SeverityOption
                  key={key}
                  color={obj.color}
                  onClick={() => {
                    onSeveritySelect(category.value, key)
                  }}
                >
                  {obj.text}
                </SeverityOption>
              ))}
            </Dropdown>
          </SeverityCateButton>
        </SeverityCategory>
      )
    })}
  </Wrapper>
)

SeverityBar.propTypes = {
  onSeveritySelect: PropTypes.func.isRequired,
  severity: PropTypes.object,
}
export default SeverityBar

const Wrapper = styled.div`
  flex: 0 0 48px;
  margin: -26px -1px 0 -1px;
  display: flex;
  justify-content: flex-end;
`

const SeverityCategory = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  &:first-of-type > div:last-of-type {
    border-left: none;
    border-top-left-radius: 4px;
  }
  &:last-of-type > div:last-of-type {
    border-right: none;
    border-top-right-radius: 4px;
  }
`
const SeverityCateName = styled.div`flex: 0;`

const SeverityCateButton = styled.div`
  border: 1px solid ${props => props.theme.general.color.TITLE};
  border-top: none;
  border-right: none;
  background-color: #eee;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #ddd;
    > div:last-child {
      display: block;
    }
  }
`
const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  top: 23px;
  display: none;
  min-width: 60px;
`
const SeverityOption = styled.div`
  color: #fff;
  padding: 2px 0;
  background-color: ${props => props.color};
  &:hover {
    opacity: 0.8;
  }
`

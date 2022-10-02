import React from 'react'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import { Spin } from 'antd'

const NOT_MATCH_PROPERTY = 'not match any propertys'

export const withLoading = (WrappedComponent, opts) => {
  const defaultOptions = {
    timeOut: 1000,
    isLoading: true,
    loadProperty: 'data.loading',
  }
  const mergeOpts = Object.assign({}, defaultOptions, opts)
  const { isLoading, timeOut, loadProperty } = mergeOpts
  return class extends React.Component {
    state = {
      isLoading,
    }
    componentDidMount() {
      this.timeOut = setTimeout(() => {
        this.setState({
          isLoading: false,
        })
      }, timeOut)
    }
    componentWillReceiveProps(nextProps) {
      const loadingFlag = get(nextProps, loadProperty, NOT_MATCH_PROPERTY)
      const hideLoading = () => {
        clearTimeout(this.timeout)
        this.setState({
          isLoading: false,
        })
      }
      if (isBoolean(loadingFlag) && !loadingFlag) {
        hideLoading()
      } else if (loadingFlag === NOT_MATCH_PROPERTY) {
        throw new Error('withLoading requre a loadProperty to judage loading or not!')
      } else if (!isEmpty(loadingFlag)) {
        hideLoading()
      }
    }
    render() {
      return (<Spin tip="数据加载中..." spinning={this.state.isLoading}>
        <WrappedComponent {...this.props} />
      </Spin>)
    }
  }
}

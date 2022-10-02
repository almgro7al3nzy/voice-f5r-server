import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'

import { Modal } from 'antd'
import { ASSESSMENT_SEVERITY_DEFAULT_VALUE, SOAP_CATEGORY } from '../constants'
import EditModalComponent from '../components/EditModal'
import { closeModal } from '../../modal/reducers'
import {
  mutationAddSoap,
  mutationUpdateSoap,
  getFollowUpAndSoapsForPatient,
  getSoapCorpus,
  mutationAddSoapCorpus,
  mutationRemoveSoapCorpus,
} from '../actions'

import { popupEditRiskCategory } from '../../risk-categories/actions'
import EditRiskCategoryModal from '../../risk-categories/containers/EditModal'

class Container extends React.Component {
  static propTypes = {
    patientId: PropTypes.string.isRequired,
    mutationAddSoap: PropTypes.func.isRequired,
    mutationUpdateSoap: PropTypes.func.isRequired,
    mutationAddSoapCorpus: PropTypes.func.isRequired,
    mutationRemoveSoapCorpus: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    soap: PropTypes.object,
    getSoapCorpus: PropTypes.object.isRequired,
    popupEditRiskCategory: PropTypes.func.isRequired,
  }
  state = {
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    phoneFollowUpAt: new Date(),
    overdue: false,
    severity: ASSESSMENT_SEVERITY_DEFAULT_VALUE.toJS(),

    category: 'medicine',
    selectedAssessment: null,
    communicateWay: '',
    saving: false,
  }
  componentWillMount() {
    if (this.props.soap) {
      this.setState({ ...this.props.soap })
    }
  }
  onContentChange(cate, content) {
    this.setState({ [cate]: content })
  }

  onSeveritySelect(key, value) {
    const severity = this.state.severity
    severity[key] = value
    this.setState({ severity })
  }
  onCorpusSelect({ segment, value, _id }) {
    const origContent = this.state[segment]
    const newContent = origContent ? `${origContent}\n${value}` : value

    const stateDiff = { [segment]: newContent }

    if (segment === 'assessment') {
      stateDiff.selectedAssessment = _id
    }

    this.setState(stateDiff)
  }
  // onFollowUpDateSelect(date) {
  //   this.setState({ phoneFollowUpAt: date })
  // }
  onClickSave = debounce(() => {
    const closeMe = this.props.closeModal
    const popEditRiskModal = this.props.popupEditRiskCategory
    const soap = this.state
    soap.patientId = this.props.patientId
    const refetchQueries = [
      {
        query: getFollowUpAndSoapsForPatient,
        variables: {
          patientId: soap.patientId,
        },
      },
    ]
    const mutate = soap._id ? this.props.mutationUpdateSoap : this.props.mutationAddSoap
    this.setState({
      saving: true,
    })
    mutate({
      variables: soap,
      refetchQueries,
    }).then(() => {
      closeMe()
      Modal.confirm({
        title: '您将要保存此次随访SOAP，是否还要修改患者危险因素定义？',
        onOk() {
          popEditRiskModal(<EditRiskCategoryModal />)
        },
      })
    })
  }, 500)
  onSubmitNewCorpus({ category, segment, dependence, value }, callback) {
    let upperCategory = _.find(SOAP_CATEGORY, { value: category })
    upperCategory = upperCategory.upperCase
    const refetchQueries = [
      {
        query: getSoapCorpus,
      },
    ]
    this.props
      .mutationAddSoapCorpus({
        variables: {
          category: upperCategory,
          segment: segment.toUpperCase(),
          dependence,
          value,
        },
        refetchQueries,
      })
      .then(() => callback())
  }
  onRemoveCorpus(_id) {
    const refetchQueries = [
      {
        query: getSoapCorpus,
      },
    ]
    this.props.mutationRemoveSoapCorpus({
      variables: {
        _id,
      },
      refetchQueries,
    })
  }
  onCategoryChange(category) {
    this.setState({ category, selectedAssessment: null })
  }
  handleSelectChange(e) {
    this.setState({ communicateWay: e })
  }
  filterCorpus() {
    const { loading, soapCorpus } = this.props.getSoapCorpus
    if (loading) return null
    const clientCategory = _.find(SOAP_CATEGORY, { value: this.state.category })
    const transCorpus = _(soapCorpus)
      .filter({ category: clientCategory.upperCase })
      .map(corpus => ({
        _id: corpus._id,
        category: clientCategory.value,
        segment: corpus.segment.toLowerCase(),
        dependence: corpus.dependence,
        value: corpus.value,
        createdBy: corpus.createdBy,
      }))
      .value()
    return transCorpus
  }
  render() {
    const corpus = this.filterCorpus()
    return (
      <EditModalComponent
        {...this.props}
        data={this.state}
        corpus={corpus}
        onCategoryChange={cate => this.onCategoryChange(cate)}
        handleSelectChange={cate => this.handleSelectChange(cate)}
        onContentChange={(cate, value) => this.onContentChange(cate, value)}
        onSeveritySelect={(key, value) => this.onSeveritySelect(key, value)}
        onCorpusSelect={(cate, value) => this.onCorpusSelect(cate, value)}
        onFollowUpDateSelect={date => this.onFollowUpDateSelect(date)}
        onSubmitNewCorpus={(content, callback) => this.onSubmitNewCorpus(content, callback)}
        onRemoveCorpus={_id => this.onRemoveCorpus(_id)}
        onClickSave={() => this.onClickSave()}
      />
    )
  }
}

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})

export default compose(
  graphql(getSoapCorpus, { name: 'getSoapCorpus' }),
  graphql(mutationAddSoap, { name: 'mutationAddSoap' }),
  graphql(mutationUpdateSoap, { name: 'mutationUpdateSoap' }),
  graphql(mutationAddSoapCorpus, { name: 'mutationAddSoapCorpus' }),
  graphql(mutationRemoveSoapCorpus, { name: 'mutationRemoveSoapCorpus' }),
  connect(mapStateToProps, { closeModal, popupEditRiskCategory }),
)(Container)

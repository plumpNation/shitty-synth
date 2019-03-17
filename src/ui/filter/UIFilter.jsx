import React from 'react'
import {connect} from 'react-redux'

import logger from '../../lib/logger'
import Filter from '../../lib/filters/Filter'

import filterActions from '../../state/filters/actions'

const defaultI18n = {
  FILTER: 'Filter',
  REMOVE: 'Remove'
}

const filterStyle = {
  display: 'flex'
}

class UIFilter extends React.PureComponent {
  /** @type {Synth.UIFilter.Props} */
  static defaultProps = {
    frequency: 100,
    type: Filter.LOW_PASS,
    i18n: defaultI18n,
    isActive: true,
    onChange: event => undefined
  }

  updateType = event => {
    this.props.onUpdated({id: this.props.id, type: event.target.value})
  }

  updateFrequency = event => {
    this.props.onUpdated({id: this.props.id, frequency: event.target.value})
  }

  remove = () => {
    this.props.onRemoved({id: this.props.id})
  }

  controls = () => {
    return (<div className='oscillator-controls'>
      <button onClick={this.remove}>{this.i18n.REMOVE}</button>
    </div>)
  }

  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  render () {
    logger.debug(this.props, 'UIFilter.render')

    return (
      <fieldset className='filter' style={filterStyle}>
        <legend>
          {this.i18n.FILTER}: {this.props.type}
        </legend>
        {this.controls()}
      </fieldset>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(UIFilter)

function mapStateToProps (state) {
  logger.debug(state, 'UIOscillator.mapStateToProps')

  return {
    filters: state.filters
  }
}

function mapDispatchToProps () {
  logger.debug('UIOscillator.mapDispatchToProps')

  return {
    onUpdated: filterActions.update,
    onRemoved: filterActions.remove
  }
}

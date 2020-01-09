import React from 'react'
import { connect } from 'react-redux'

import logger from '../../lib/logger'
import Filter from '../../lib/filters/Filter'

import filterActions from '../../state/filters/actions'

import SliderInput from '../common/SliderInput'

import { filterInput } from './FilterInput.styl'

const defaultI18n = {
  FILTER: 'Filter',
  REMOVE: 'Remove',
  FREQUENCY: 'Frequency',
  GAIN: 'Gain',
  QUALITY: 'Quality',
  DETUNE: 'Detune'
}

class FilterInput extends React.PureComponent {
  /** @type {Synth.Filter.Props} */
  static defaultProps = {
    frequency: 100,
    type: Filter.LOW_PASS,
    i18n: defaultI18n,
    isActive: true,
    onChange: (_) => undefined
  }

  updateType = (event) => {
    this.props.onUpdated({id: this.props.id, type: event.target.value})
  }

  updateFrequency = (event) => {
    this.props.onUpdated({id: this.props.id, frequency: event.target.value})
  }

  updateQuality = (event) => {
    this.props.onUpdated({id: this.props.id, quality: event.target.value})
  }

  updateDetune = (event) => {
    this.props.onUpdated({id: this.props.id, detune: event.target.value})
  }

  updateGain = (event) => {
    this.props.onUpdated({id: this.props.id, gain: event.target.value})
  }

  remove = () => {
    this.props.onRemoved({id: this.props.id})
  }

  sliders = () => {
    return (
      <div className="filter-sliders">
        <SliderInput
          name={this.i18n.FREQUENCY}
          onChange={this.updateFrequency}
          min={0}
          max={5000}
          value={this.props.frequency}
        />

        <SliderInput
          name={this.i18n.DETUNE}
          onChange={this.updateDetune}
          min={0}
          max={100}
          value={this.props.detune}
        />

        <SliderInput
          name={this.i18n.GAIN}
          onChange={this.updateGain}
          min={0}
          max={100}
          value={this.props.gain}
        />

        <SliderInput
          name={this.i18n.QUALITY}
          onChange={this.updateQuality}
          min={0}
          max={100}
          value={this.props.quality}
        />
      </div>
    )
  }

  controls = () => {
    return (
      <div className={filterInput}>
        <button onClick={this.remove}>{this.i18n.REMOVE}</button>
      </div>
    )
  }

  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  render () {
    logger.debug(this.props, 'Filter.render')

    return (
      <fieldset className='filter-input'>
        <legend>
          {this.i18n.FILTER}: {this.props.type}
        </legend>
        {this.sliders()}
        {this.controls()}
      </fieldset>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(FilterInput)

function mapStateToProps (state) {
  logger.debug(state, 'OscillatorsInput.mapStateToProps')

  return {
    filters: state.filters
  }
}

function mapDispatchToProps () {
  logger.debug('OscillatorsInput.mapDispatchToProps')

  return {
    onUpdated: filterActions.update,
    onRemoved: filterActions.remove
  }
}

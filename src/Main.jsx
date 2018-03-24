import React from 'react'
import SubSynth from './modules/synths/SubSynth'
import logger from './lib/logger'

export class Main extends React.Component {
  render () {
    logger.debug('rendering Main')

    return <SubSynth />
  }
}

export default Main

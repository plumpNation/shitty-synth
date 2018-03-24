import React from 'react'
import SubSynth from './modules/synths/SubSynth'
import logger from './lib/logger'

export class App extends React.Component {
  render () {
    logger.debug('App: rendering')

    return <SubSynth />
  }
}

export default App

import React from 'react'

class SubSynth extends React.Component {
  render (props, state) {
    return <section className='subsynth'>
      <h2>Sub Synth</h2>

      <section className='oscillator-controls'>

        <h3>Oscillator</h3>

        <label>
          <span>Volume</span>
          <input type='range' />
        </label>

        <label>
          <span>Type</span>
          <select className='wave-type'>
            <option value='square'>Square</option>
            <option value='saw'>Saw</option>
            <option value='round'>Round</option>
          </select>
        </label>

      </section>

    </section>
  }
}

export default SubSynth

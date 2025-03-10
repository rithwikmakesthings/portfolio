import raf from 'raf'
import random from 'random'
import React, { Component } from 'react'
import FluidAnimation from 'react-fluid-animation'

const exp = random.exponential()
const numSplatsPerEpoch = 1
const minSplatRadius = 0.01
const maxSplatRadius = 0.03

export class HeroHeader extends Component<{
  className?: string
}> {
  _time: number = Date.now()
  _direction: number
  _tickRaf: any
  _timeout: any
  _animation: any

  componentDidMount() {
    this._time = Date.now()
    this._direction = 1
    this._reset()
    this._tick()
  }

  componentWillUnmount() {
    if (this._tickRaf) {
      raf.cancel(this._tickRaf)
      this._tickRaf = null
    }

    if (this._timeout) {
      clearTimeout(this._timeout)
      this._timeout = null
    }
  }

  render() {
    return (

      <div
        style={{
          //position: 'fixed',
          width: '75vw',
          filter: 'blur(1px)',
          margin: '0 auto'
        }} >
      <FluidAnimation
        className={this.props.className}
        animationRef={this._animationRef}
      />

    </div>
    )
  }

  _animationRef = (ref) => {
    this._animation = ref
    this._reset()
  }

  _reset() {
    if (this._animation) {
      this._animation.config.splatRadius = random.float(
        minSplatRadius,
        maxSplatRadius
      )
      this._animation.addRandomSplats(random.int(100, 180))
    }
  }

  _tick = () => {
    this._tickRaf = null
    this._timeout = null

    let scale = 1.0

    if (this._animation) {
      const w = this._animation.width
      const h = this._animation.height

      // adjust the intensity scale depending on the canvas width
      const s = Math.max(0.1, Math.min(1, w / 1200))
      scale = Math.pow(s, 1.2)

      this._animation.config.splatRadius = random.float(
        minSplatRadius * scale,
        maxSplatRadius * scale
      )



      const splats = []
      for (let i = 0; i < numSplatsPerEpoch; ++i) {
        // Generate lighter (pastel) colors by restricting each channel to 5–10
        const color = [
          random.float(0, 1),
          random.float(9, 10),
          random.float(5, 10),
        ]

        const w0 = w / 3.0
        const w1 = (w * 2.0) / 3.0

        const h0 = h / 3.0
        const h1 = (h * 2.0) / 3.0

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const x = random.float(w)
          const y = random.float(h)

          // favor uniformly distributed samples within the center-ish of the canvas
          if (x > w0 && x < w1 && y > h0 && y < h1) {
            continue
          }

          const dx = random.float(-1, 1) * random.float(200, 3000) * scale
          const dy = random.float(-1, 1) * random.float(200, 3000) * scale
          const splat = { x, y, dx, dy, color }
          splats.push(splat)
          break
        }
      }

      this._animation.addSplats(splats)
    }

    // exponential distribution for time intervals
    const dampenedScale = Math.pow(scale, 0.2)
    const timeout = (exp() * 250) / dampenedScale

    this._timeout = setTimeout(() => {
      this._tickRaf = raf(this._tick)
    }, timeout)
  }
}

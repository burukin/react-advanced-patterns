import React from 'react';
import mojs from 'mo-js'

const withClapAnimation = WrappedComponent => {
  class WithClapAnimation extends React.Component {
    animationTimeline = new mojs.Timeline()
    state = {
      animationTimeline: this.animationTimeline
    }

    componentDidMount () {
      const tlDuration = 300
      const scaleButton = new mojs.Html({
        el: '#clap',
        duration: tlDuration,
        scale: { 1.3: 1 },
        easing: mojs.easing.ease.out
      })

      const triangleBurst = new mojs.Burst({
        parent: '#clap',
        radius: { 50: 95 },
        count: 5,
        angle: 30,
        children: {
          shape: 'polygon',
          radius: { 6: 0 },
          stroke: 'rgba(211,54,0,0.5)',
          strokeWidth: 2,
          angle: 210,
          delay: 30,
          speed: 0.2,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
          duration: tlDuration
        }
      })

      const circleBurst = new mojs.Burst({
        parent: '#clap',
        radius: { 50: 75 },
        angle: 25,
        duration: tlDuration,
        children: {
          shape: 'circle',
          fill: 'rgba(149,165,166,0.5)',
          delay: 30,
          speed: 0.2,
          radius: { 3: 0 },
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      })

      const countAnimation = new mojs.Html({
        el: '#clapCount',
        opacity: { 0: 1 },
        y: { 0: -30 },
        duration: tlDuration
      }).then({
        opacity: { 1: 0 },
        y: -80,
        delay: tlDuration / 2
      })

      const countTotalAnimation = new mojs.Html({
        el: '#clapCountTotal',
        opacity: { 0: 1 },
        delay: (3 * tlDuration) / 2,
        duration: tlDuration,
        y: { 0: -3 }
      })

      const clap = document.getElementById('clap')
      clap.style.transform = 'scale(1,1)'

      const newAnimationTimeline = this.animationTimeline.add([
        scaleButton,
        countTotalAnimation,
        countAnimation,
        triangleBurst,
        circleBurst
      ])
      this.setState({ animationTimeline: newAnimationTimeline })
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          animationTimeline={this.state.animationTimeline}
        />
      )
    }
  }
  return WithClapAnimation
}

export default withClapAnimation;
import React, { Component, useState } from 'react'

import MediumClap from './01/components/MediumClap';
import withClapAnimation from './01/HOC/withClapAnimation';

const Usage = () => {
  const AnimatedMediumClap = withClapAnimation(MediumClap)
  return <AnimatedMediumClap />
}

export default Usage
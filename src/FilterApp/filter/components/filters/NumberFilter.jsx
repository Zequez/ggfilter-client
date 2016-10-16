import React, { Component, PropTypes as t } from 'react'
import TextFilter from './TextFilter'

export default class NumberFilter extends TextFilter {
  render () {
    return super.render({type: 'number'})
  }
}

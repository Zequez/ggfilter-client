// import React, { Component, PropTypes as t } from 'react'
import TextControl from './TextControl'

export default class NumberControl extends TextControl {
  render () {
    return super.render({type: 'number'})
  }
}

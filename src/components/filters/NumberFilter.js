import React, { Component, PropTypes as t } from 'react'
var TextFilter = require('./TextFilter')

export default class NumberFilter extends TextFilter {
  render() {
    return super.render({type: 'number'})
  }
}

import React, { Component, PropTypes as t } from 'react'
import { mapRange, chunkSize, mapChunkRange, paramsToRange, rangeToParams } from 'lib/FancyRangeFilterHelpers'
import FancyRangeFilterSensor from './FancyRangeFilterSensor'
import FancyRangeFilterBar from './FancyRangeFilterBar'
import FancyRangeFilterLabel from './FancyRangeFilterLabel'

export default class FancyRangeFilter extends Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    options: t.object.isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      gt: null,
      lt: null
    }
  }

  state = {
    chunkStart: 0,
    chunkEnd: 0,
    chunkPos: 0,
    start: 0,
    end: 0,
    dragging: false,
    hovering: false,
    justFinishedDragging: false
  }

  componentWillMount () {
    this.options = {
      range: [1, 2, 3, 4, 5],
      namedRanges: {},
      mappedRanges: {},
      label: {},
      autohook: undefined,
      strictlyRangeMode: false,
      ...this.props.options
    }

    if (this.options.autohook !== undefined && this.options.strictlyRangeMode === true) {
      console.warn("Autohook won't have any effect with strictlyRangeMode")
    }

    let { range, strictlyRangeMode } = this.options
    this.chunkSize = chunkSize(range.length, strictlyRangeMode)

    this.readQuery()
  }

  componentWillReceiveProps (np) {
    this.readQuery(np.query)
  }

  readQuery (query = this.props.query) {
    let { range, strictlyRangeMode } = this.options

    let [start, end, chunkStart, chunkEnd] = paramsToRange(query, range, strictlyRangeMode)

    this.setState({start, end, chunkStart, chunkEnd})
  }

  triggerChange (start, end) {
    this.props.onChange(rangeToParams(start, end, this.options.range))
  }

  onSensorHover = (chunkPos) => {
    this.setState({chunkPos, hovering: true, justFinishedDragging: false})
  }

  onSensorLeave = () => {
    this.setState({hovering: false})
  }

  onSensorDrag = (chunkStart, chunkEnd, status) => {
    let start, end
    ;[start, end, chunkStart, chunkEnd] = this.mapChunkRange(chunkStart, chunkEnd)

    this.setState({start, end, chunkStart, chunkEnd})

    if (status !== null) this.setState({dragging: status})
    if (status === false) {
      this.setState({justFinishedDragging: true})
      this.triggerChange(start, end)
    }
  }

  onSensorReset = () => {
    this.props.onChange(null)
  }

  mapChunkRange (chunkStart, chunkEnd) {
    let o = this.options
    return mapChunkRange(
      chunkStart,
      chunkEnd,
      o.range,
      o.mappedRanges,
      o.autohook,
      o.strictlyRangeMode
    )
  }

  render () {
    let { range } = this.options
    let { dragging, hovering, start, end, chunkStart, chunkEnd, chunkPos, justFinishedDragging } = this.state

    let showHighlightBar = hovering && !dragging && !justFinishedDragging
    let hmStart, hmEnd, hmChunkStart, hmChunkEnd
    if (showHighlightBar) {
      // hm = hoverMapped
      [hmStart, hmEnd, hmChunkStart, hmChunkEnd] = this.mapChunkRange(chunkPos, chunkPos)
    }

    return (
      <div
        className='fancy-rf'
        ref='bar'
        >
        <FancyRangeFilterSensor
          chunkSize={this.chunkSize}
          onHover={this.onSensorHover}
          onLeave={this.onSensorLeave}
          onDrag={this.onSensorDrag}
          onReset={this.onSensorReset}/>
        <FancyRangeFilterBar
          className='fancy-rf-bar'
          chunkSize={this.chunkSize}
          start={chunkStart}
          end={chunkEnd}
          />
        {showHighlightBar ? (
          <FancyRangeFilterBar
            className='fancy-rf-highlight'
            chunkSize={this.chunkSize}
            start={hmChunkStart}
            end={hmChunkEnd}
            />
        ) : null}
        {/* Debug thingy */}
        {/*<div className={`fancy-rf-label`}>
          <span>{chunkStart}-{chunkEnd} / {start}-{end} ({range[start]}-{range[end]})</span>
        </div>*/}
        <FancyRangeFilterLabel
          start={showHighlightBar ? hmStart : start}
          end={showHighlightBar ? hmEnd : end}
          range={range}
          namedRanges={this.options.namedRanges}
          options={this.options.label}
          className={showHighlightBar ? 'mouse-label' : ''}/>
      </div>
    )
  }
}

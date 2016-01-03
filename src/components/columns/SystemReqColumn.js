export default class SystemReqColumn extends React.Component {
  requirementsList (req, label) {
    let st = JSON.stringify

    if (!req) return null
    return (
      <li>
        <strong>{label}:</strong>
        <ul>
          <li><strong>Processor:</strong> {st(req.processor)}</li>
          <li><strong>Memory:</strong> {st(req.memory)}</li>
          <li><strong>Video:</strong> {st(req.video_card)}</li>
          <li><strong>Disk:</strong> {st(req.disk_space)}</li>
        </ul>
      </li>
    )
  }

  render () {

    let req = this.props.value
    let string = req.minimum && req.minimum.video_card
    let tokens = req.minimum && req.min_video_tokens && req.min_video_tokens.join(' ')
    return (<div>
      <span className={'string ' + (tokens ? '' : 'no-tokens')}>{string}</span>
      <span className='tokens'>{tokens}</span>
    </div>)
    // return (
    //   <ul>
    //     {this.requirementsLis}
    //     {this.requirementsList(req.minimum, 'Minimum')}
    //     {this.requirementsList(req.recommended, 'Recommended')}
    //   </ul>
    // )
  }
}

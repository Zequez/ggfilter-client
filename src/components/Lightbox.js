var t = React.PropTypes

export default class Lightbox extends React.Component {
  static propTypes = {
    media: t.arrayOf(t.string).isRequired,
    thumbnails: t.arrayOf(t.string).isRequired,
    onClose: t.func
  }

  static defaultProps = {
    onClose: ()=>{}
  }

  state = { selected: 0 }

  componentDidMount() {
    window.addEventListener('keypress', this.onKeyPress)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({selected: 0})
    }
  }

  onClickThumbnail(i, ev) {
    this.setState({selected: i})
    ev.stopPropagation()
  }

  preventClick = (ev)=>{
    ev.stopPropagation()
  }

  onKeyPress = (ev)=>{
    let i = this.state.selected
    let key = ev.charCode || ev.keyCode
    switch(key) {
      case 97: // a
      case 37: // ArrowLeft
        i -= 2
      case 100: // d
      case 39:  // ArrowRight
        i += 1
        if (i < 0) i = this.props.media.length
        else if (i > this.props.media.length-1) i = 0
        this.setState({selected: i})
      break

      case 27: // Escape
        this.props.onClose()
      break
    }
  }

  render() {
    if (!this.props.media.length) return (<div></div>)

    var thumbnails = this.props.thumbnails.map((t, i)=>{
      return (
        <li key={i} className={this.state.selected === i ? 'selected' : ''}>
          <img src={t} onClick={this.onClickThumbnail.bind(this, i)}/>
        </li>
      )
    })

    return (
      <div className='lightbox' onClick={this.props.onClose}>
        <div className='lightbox-media'>
          <img src={this.props.media[this.state.selected]} onClick={this.preventClick}/>
        </div>
        <ul className='lightbox-thumbnails'>
          {thumbnails}
        </ul>
      </div>
    )
  }
}

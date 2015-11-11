var t = React.PropTypes
var classNames = require('classnames')
var debounce = require('lib/utils').debounce

export default class GamesLoader extends React.Component {
  static propTypes = {
    fetching: t.bool.isRequired,
    failed: t.bool.isRequired,
    onRequestMore: t.func.isRequired
  }

  componentDidMount() {
    window.addEventListener('scroll', debounce(50, this.handleWindowScroll.bind(this)))
  }

  offsetTopDocument() {
    let el = this.refs.el
    let offset = 0
    while (el) {
      offset += el.offsetTop
      el = el.offsetParent
    }
    return offset
  }

  handleWindowScroll() {
    var clientHeight = window.innerHeight
    var scrollTop = window.scrollY
    var offsetTop = this.offsetTopDocument()
    var position = clientHeight + scrollTop
    var diff = offsetTop - position
    console.log(diff)
    if (diff < 100) {
      this.requestMoreGames()
    }
  }

  handleClick(ev) {
    this.requestMoreGames()
  }

  requestMoreGames() {
    if (!this.props.fetching) {
      this.props.onRequestMore()
    }
  }

  render() {
    let divClass = classNames('games-loader', {
      'games-loader-fetching': this.props.fetching,
      'games-loader-failed': this.props.failed
    })

    return (
      <div
        ref='el'
        className={divClass}
        onClick={this.handleClick.bind(this)}>
      </div>
    )
  }
}

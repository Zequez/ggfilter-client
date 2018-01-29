import Text from './Text'

export default class NumberControl extends Text {
  render () {
    return super.render({type: 'number'})
  }
}

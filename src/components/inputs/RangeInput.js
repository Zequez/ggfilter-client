// class RangeInput extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       gt: props.gt,
//       lt: props.lt
//     }
//   }
//
//   handleInputChange(ev, type) {
//     console.log(ev.target.value)
//     this.setState({[type]: ev.target.value})
//     // var gt = parseInt(this.refs.gt.value) || null
//     // var lt = parseInt(this.refs.lt.value) || null
//     // this.props.onChange( (gt || lt) ? {gt: gt, lt: lt} : null )
//   }
//
//   render() {
//     return (
//       <div className='range-input'>
//         <input
//           type='number'
//           value={this.state.gt}
//           ref='gt'
//           onChange={this.handleInputChange.bind(this, 'gt')} />
//         <input
//           type='number'
//           value={this.state.lt}
//           ref='lt'
//           onChange={this.handleInputChange.bind(this, 'lt')} />
//       </div>
//     )
//   }
// }
//
// var t = React.PropTypes
// RangeInput.propTypes = {
//   gt: t.number,
//   lt: t.number,
//   min: t.number.isRequired,
//   max: t.number.isRequired,
//   onChange: t.func.isRequired
// }
//
// export default RangeInput

// // Warning, this class is hacky:
// // - reads parentNode.parentNode.parentNode.clientWidth
// // - modifies parentNode.parentNode.style.width
// // Use with caution

// import * as th from './ColumnsWidthFixator.sass';
// import * as React from 'react';
// import { FiltersConfiguration } from '../../../filter';
// import definitions, { FiltersNames } from '../../../../Definitions';
// import debounce from 'lodash/debounce'
// import { u } from 'shared/lib/utils'
// import TableWidthCalculator from '../../../lib/TableWidthCalculator'
// import ResizeHandle from './ResizeHandle'

// interface ColumnsWidthFixatorProps {
//   configuration: FiltersConfiguration;
// }

// interface ColumnsWidthFixatorState {
//   deltaWidth: {[key in FiltersNames]: number};
//   containerWidth: number;
// }

// export default class ColumnsWidthFixator extends React.Component<ColumnsWidthFixatorProps> {
//   state = {
//     deltaWidth: {},
//     containerWidth: 1280
//   };

//   debouncedResize = null;

//   // Don't look at this, this part is very hacky
//   // But it's the most efficient...
//   componentDidMount () {
//     this.setContainerWidth()

//     this.debouncedResize = debounce(this.setContainerWidth, 100)
//     window.addEventListener('resize', this.debouncedResize)
//   }

//   componentDidUpdate () {
//     let table = this.getHackyTable()
//     table.style.width = this.calc.tableWidth + 'px'
//   }

//   componentWillUnmount () {
//     window.removeEventListener('resize', this.debouncedResize)
//   }

//   setContainerWidth = () => {
//     this.setState({containerWidth: this.getHackyContainer().clientWidth})
//   }

//   getHackyContainer () { return this.refs.tr.parentNode.parentNode.parentNode }
//   getHackyTable () { return this.refs.tr.parentNode.parentNode }

//   // End of hacky stuff

//   onResize = (filter, deltaAdded) => {
//     let minDelta = -filter.width + 8
//     let delta = (this.state.deltaWidth[filter.name] || 0) + deltaAdded

//     this.setDelta(filter, Math.max(minDelta, delta))
//   }

//   onResetResize = (filter) => {
//     this.setDelta(filter, 0)
//   }

//   setDelta (filter, amount) {
//     this.setState({deltaWidth: u(this.state.deltaWidth, {[filter.name]: {$set: amount}})})
//   }

//   render () {
//     this.calc = new TableWidthCalculator(
//       this.props.columns, this.state.deltaWidth, this.state.containerWidth
//     )

//     return (
//       <tr className={th.ColumnsWidthFixator} ref='tr'>
//         {this.calc.map((filter, width) => (
//           <td key={filter.name} style={{width: `${width}px`}}>
//             <ResizeHandle
//               onStop={this.onResize.bind(this, filter)}
//               onDoubleClick={this.onResetResize.bind(this, filter)}/>
//           </td>
//         ))}
//       </tr>
//     )
//   }
// }

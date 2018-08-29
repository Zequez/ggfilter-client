// import * as React from 'react';
// import tooltipFactory from 'shared/components/Tooltip';
// import Ripple from 'shared/components/Ripple';
// import Title from './Title';

// import { Filter }  from '../../../../Definitions';
// import { FilterConfig }  from '../../../filter/initialState';

// const TooltippedTitle = tooltipFactory(Title, {position: 'top'});
// const SortableTooltippedTitle = Ripple()(TooltippedTitle);

// type WrappedTitleProps = {
//   title: string;
//   sortable: boolean;
//   sort:
// }

// export default class WrappedTitle extends React.Component<WrappedTitleProps> {
//   static propTypes = {
//     column: t.shape({
//       title: t.string.isRequired,
//       sort: t.oneOfType([t.string, t.bool])
//     })
//   };

//   render () {
//     let { title, longTitle, sort } = this.props.column;
//     let sortable = !!sort;
//     let Comp = sortable ? SortableTooltippedTitle : TooltippedTitle;
//     return <Comp tooltip={longTitle || title} {...this.props}/>;
//   }
// }

import * as React from 'react';
import * as th from './Pct.sass';
import * as cx from 'classnames';
import { Range } from '../../../../Api';

const UNSTICKY_TIME = 1000;
const BLOCKS = 10;

interface PctProps {
  query: Range;
  onChange: (query: Range) => void;
}

interface PctState {
  dragStart: number;
  dragEnd: number;
  currentBlock: number;
  dragStartTime: number;
  justFinishedDragging: boolean;
  stickyTimeout: number;
};

function getBlock(ev: React.SyntheticEvent<HTMLDivElement>) {
  return parseInt(ev.target['dataset'].block);
}

function nan (val: number): number { return val === null ? NaN : val; }

export default class Pct extends React.Component<PctProps, PctState> {
  static defaultProps = {
    query: {
      gt: null,
      lt: null
    }
  };

  state = {
    dragStart: null,
    dragEnd: null,
    currentBlock: null,
    dragStartTime: null,
    justFinishedDragging: false,
    stickyTimeout: null
  };

  onMove = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    let block = getBlock(ev);

    if (block !== this.state.currentBlock) {
      this.setState({justFinishedDragging: false});
    }

    if (this.state.dragStart !== null) {
      this.setState({dragEnd: block});
    }

    this.setState({currentBlock: block});
    clearTimeout(this.state.stickyTimeout);
  }

  onMouseOut = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    this.setState({currentBlock: null, justFinishedDragging: false});
    clearTimeout(this.state.stickyTimeout);
  }

  onDragStart = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    let block = getBlock(ev);
    this.setState({dragStart: block, dragEnd: null, dragStartTime: new Date().valueOf()});
    let timeout = window.setTimeout(() => {
      this.setState({dragEnd: block});
    }, UNSTICKY_TIME);
    this.setState({stickyTimeout: timeout});
  }

  onDragEnd = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    let [dragStart, dragEnd] = this.computedStartEnd();
    this.setState({dragStart: null, dragEnd: null, justFinishedDragging: true});
    this.props.onChange({gt: dragStart, lt: dragEnd});
    clearTimeout(this.state.stickyTimeout);
  }

  computedStartEnd () {
    let { dragStart, dragEnd } = this.state;
    if (dragStart != null) {
      if (dragEnd == null) dragEnd = BLOCKS - 1;
      if (dragStart > dragEnd) [dragStart, dragEnd] = [dragEnd, dragStart];
    }
    return [dragStart, dragEnd];
  }

  render () {
    let blocks = Array(BLOCKS).fill(0);
    let [dragStart, dragEnd] = this.computedStartEnd();
    let { gt, lt } = this.props.query;
    let { currentBlock, justFinishedDragging } = this.state;
    dragStart = nan(dragStart);
    dragEnd = nan(dragEnd);
    gt = nan(gt);
    lt = nan(lt);

    let isDragging = !isNaN(dragStart);

    if (isNaN(dragStart) && isNaN(dragEnd) && currentBlock != null && !justFinishedDragging) {
      dragStart = currentBlock;
      dragEnd = BLOCKS - 1;
    }

    return (
      <div className={th.Pct}>
        <div
          className={th.__blocks}
          onMouseOut={this.onMouseOut}
          onMouseMove={this.onMove}
          onMouseDown={this.onDragStart}
          onMouseUp={this.onDragEnd}>
          {blocks.map((_, i) =>
            <div
              key={i}
              className={cx(th.__block, {
                [th.__block_highlighted]: (i >= dragStart && i <= dragEnd),
                [th.__block_selected]: (i >= gt && i <= lt),
                [th.__block_dragging]: isDragging,
              })}
              data-block={i}>
            </div>
          )}
        </div>
        <div className={th.__value}></div>
        <div className={th.__labels}>

        </div>
      </div>
    );
  }
}

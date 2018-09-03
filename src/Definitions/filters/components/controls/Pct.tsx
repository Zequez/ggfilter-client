import * as React from 'react';
import * as th from './Pct.sass';
import * as cx from 'classnames';
import { Range } from '../../../../Api';

const UNSTICKY_TIME = 1000;
const BLOCKS = 20;
const RANGE = 100;
const STICKY = true;

interface PctProps {
  query: Range;
  onChange: (query: Range) => void;
  config: {
    labelMin: string;
    labelMax: string;
    pctValues: string[];
  };
}

interface PctState {
  dragStart: number;
  dragEnd: number;
  currentBlock: number;
  justFinishedDragging: boolean;
  stickyTimeout: number;
};

function getEvBlock(ev: React.SyntheticEvent<HTMLElement>) {
  return parseInt(ev.target['dataset'].block);
}

function rangeText (start: number, end: number, labels?: string[]) {
  if (!start || !end) return '';
  let val = (v) => labels ? labels[v - 1] : `${Math.floor((1 / BLOCKS) * (v - 1) * RANGE)}p`;
  return val(start) + (end === BLOCKS ? '+' : `-${val(end + 1)}`);
}

function Block (i, dragStart, dragEnd, gt, lt) {
  let highlight = dragStart && i >= dragStart && i <= dragEnd;
  let selected = gt && i >= gt && i <= lt;
  return <div
    key={i}
    className={cx(th.__block, {
      [th.__block_highlighted]: highlight,
      [th.__block_selected]: selected,
      [th.__block_dragging]: !!dragStart,
    })}
    data-block={i}>
  </div>;
}

export default class Pct extends React.Component<PctProps, PctState> {
  static defaultProps = {
    query: {
      gt: null,
      lt: null
    }
  };

  state: PctState = {
    dragStart: null,
    dragEnd: null,
    currentBlock: null,
    justFinishedDragging: false,
    stickyTimeout: null
  };

  componentDidMount () {
    window.addEventListener('mouseup', this.onWindowMouseCatch);
  }

  componentWillUnmount () {
    window.removeEventListener('mouseup', this.onWindowMouseCatch);
  }

  onWindowMouseCatch = () => {
    if (this.state.dragStart !== null) {
      this.onDragEnd();
    }
  }

  onMove = (ev: React.SyntheticEvent<HTMLElement>) => {
    this.clearStickyTimeout();
    let evBlock = getEvBlock(ev);
    let { dragStart, dragEnd, currentBlock, stickyTimeout } = this.state;

    if (evBlock !== currentBlock) {
      this.setState({justFinishedDragging: false});
    }

    if (dragStart && (evBlock !== dragStart || dragEnd)) {
      this.setState({dragEnd: evBlock});
    }

    this.setState({currentBlock: evBlock});
  }

  onMouseOut = (ev: React.SyntheticEvent<HTMLElement>) => {
    this.clearStickyTimeout();
    this.setState({currentBlock: null, justFinishedDragging: false});
  }

  onDragStart = (ev: React.SyntheticEvent<HTMLElement>) => {
    this.setState({
      dragStart: getEvBlock(ev),
      dragEnd: null
    });
    this.setStickyTimeout();
  }

  onDragEnd = (ev?: React.SyntheticEvent<HTMLElement>) => {
    this.clearStickyTimeout();
    this.setState({dragStart: null, dragEnd: null, justFinishedDragging: true});
    if (ev) ev.stopPropagation();

    let [dragStart, dragEnd] = this.computedStartEnd();
    if ((dragStart === 1 && dragEnd === BLOCKS) || !dragStart || !dragEnd) {
      this.props.onChange(null);
    } else {
      this.props.onChange({gt: dragStart, lt: dragEnd});
    }
  }

  computedStartEnd () {
    let { dragStart, dragEnd, currentBlock, justFinishedDragging } = this.state;
    if (dragStart) {
      if (!dragEnd && STICKY) dragEnd = BLOCKS;
      if (dragStart > dragEnd) [dragStart, dragEnd] = [dragEnd, dragStart];
    }

    if (!dragStart && !dragEnd && currentBlock && !justFinishedDragging) {
      dragStart = currentBlock;
      if (STICKY) dragEnd = BLOCKS;
    }

    return [dragStart, dragEnd];
  }

  setStickyTimeout () {
    this.setState({stickyTimeout: window.setTimeout(() =>
      this.setState({dragEnd: this.state.dragStart}), UNSTICKY_TIME)
    });
  }
  clearStickyTimeout () { clearTimeout(this.state.stickyTimeout); }

  render () {
    let blocks = Array(BLOCKS).fill(0);
    let [dragStart, dragEnd] = this.computedStartEnd();
    let { query: { gt, lt }, config } = this.props;

    let pctText = rangeText(dragStart || gt, dragEnd || lt);
    let labelText = rangeText(dragStart || gt, dragEnd || lt, config.pctValues);

    return (
      <div className={th.Pct}>
        <div className={th.__bar}>
          <div
            className={th.__blocks}
            onMouseOut={this.onMouseOut}
            onMouseMove={this.onMove}
            onMouseDown={this.onDragStart}
            onMouseUp={this.onDragEnd}>
            {blocks.map((_, i) => Block(i + 1, dragStart, dragEnd, gt, lt))}
          </div>
          <div className={th.__labels}>
            <div className={th.__labelMin}>{config.labelMin}</div>
            <div className={th.__labelMax}>{config.labelMax}</div>
          </div>
        </div>
        <div className={th.__value}>
          {pctText}<br/>
          {labelText}
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import * as th from './Pct.sass';
import * as cx from 'classnames';
import api, { Range } from '../../../../Api';
import PctCalc from './PctCalc';

const UNSTICKY_TIME = 600;

interface PctProps {
  query: Range;
  onChange: (query: Range) => void;
  config: {
    labelMin: string;
    labelMax: string;
    apiPercentiles: string;
    pctValues: string[];
    showLabel: boolean;
    percentiles: number[];
    interpolation: (v: number) => string;
    sticky?: 'first' | 'last';
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

function Block (i, size, start, end, gt, lt) {
  let highlight = start && i >= start && i <= end;
  let selected = gt && i >= gt && i <= lt;
  let style = {flexBasis: size};
  return <div
    key={i}
    style={style}
    className={cx(th.__block, {
      [th.__block_highlighted]: highlight,
      [th.__block_selected]: selected,
      [th.__block_dragging]: !!start,
    })}
    data-block={i}>
  </div>;
}

export default class Pct extends React.Component<PctProps, PctState> {
  static percentiles: {} = null;

  static defaultProps = {
    query: {
      gte: null,
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

  calc: PctCalc;

  componentWillMount () {
    this.calc = new PctCalc(this.props.config.percentiles, this.props.config.sticky, this.props.config.interpolation);
    api.percentiles.index().then((percentiles) => {
      this.calc.setLabels(percentiles[this.props.config.apiPercentiles]);
    });
  }

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

    let { dragStart, dragEnd } = this.state;
    this.props.onChange(this.calc.query(dragStart, dragEnd));
  }

  setStickyTimeout () {
    this.setState({stickyTimeout: window.setTimeout(() =>
      this.setState({dragEnd: this.state.dragStart}), UNSTICKY_TIME)
    });
  }
  clearStickyTimeout () { clearTimeout(this.state.stickyTimeout); }

  render () {
    let { config } = this.props;
    let { dragStart, dragEnd, currentBlock, justFinishedDragging } = this.state;
    let [gtBlock, ltBlock] = this.calc.blocksFromQuery(this.props.query);
    let [startBlock, endBlock] = this.calc.normalize(dragStart, dragEnd);
    let [hoverStartBlock, hoverEndBlock] = justFinishedDragging ? [null, null] : this.calc.normalize(currentBlock, null);
    let textStart = startBlock || hoverStartBlock || gtBlock;
    let textEnd = endBlock || hoverEndBlock || ltBlock;
    let pct = this.calc.pct(textStart, textEnd);
    let label = this.calc.label(textStart, textEnd);


    return (
      <div className={th.Pct}>
        <div
          className={th.__blocks}
          onMouseOut={this.onMouseOut}
          onMouseMove={this.onMove}
          onMouseDown={this.onDragStart}
          onMouseUp={this.onDragEnd}>
          {this.calc.eachBlock((block, size) =>
            Block(block, size, startBlock || hoverStartBlock, endBlock || hoverEndBlock, gtBlock, ltBlock))}
        </div>
        <div className={th.__labels}>
          <div className={th.__labelMin}>{config.labelMin}</div>
          <div className={th.__labelMax}>{config.labelMax}</div>
          <div className={th.__value}>
            {pct} {config.showLabel && label && label !== 'All' ? `(${label})` : ''}
          </div>

        </div>
      </div>
    );
  }
}

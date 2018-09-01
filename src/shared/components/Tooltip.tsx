import * as React from 'react';
import * as th from './Tooltip.sass';
import * as cx from 'classnames';
import Portal from './Portal';

type ReactComponentType = React.StatelessComponent<any> | React.ComponentClass<any> | string;

interface FactoryOptions {
  position?: 'top' | 'left' | 'right' | 'bottom';
  hideOnClick?: boolean;
}

interface TooltipProps extends FactoryOptions {
  tooltip: string;
  className?: string;
};

interface TooltipState {
  visible: boolean;
  firstTick: boolean;
  style: object;
};

const tooltipFactory = (ComposedComponent: ReactComponentType, defaultOptions: FactoryOptions = {}) => {
  // type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.Component<infer TProps, any> ? TProps : TComponentOrTProps;
  // type a = ExtractProps<ComposedComponent>;

  return class Tooltip extends React.Component<TooltipProps, TooltipState> {
    static defaultProps = {
      hideOnClick: true,
      position: 'bottom',
      ...defaultOptions
    };

    state = {
      visible: false,
      firstTick: true,
      style: {}
    };

    onMouseEnter = (ev) => {
      if (this.props.tooltip) {
        let coords = ev.currentTarget.getBoundingClientRect();
        this.setState({
          visible: true,
          firstTick: true,
          style: this.getTopLeft(coords)
        });
      }
    }

    getTopLeft (c): { top?: number, right?: number, bottom?: number, left?: number} {
      const docWidth = document.documentElement.clientWidth;
      const docHeight = document.documentElement.clientHeight;
      const midPointLeft = Math.floor(c.left + c.width / 2);
      const midPointTop = Math.floor(c.top + c.height / 2);

      switch (this.props.position) {
        case 'top': return { top: c.top, left: midPointLeft };
        case 'right': return { top: midPointTop, right: docWidth - c.right };
        case 'bottom': return { bottom: docHeight - c.bottom, left: midPointLeft };
        case 'left': return { top: midPointTop, left: c.left };
      }
    }

    onMouseLeave = (ev) => {
      if (this.props.tooltip) {
        this.setState({visible: false});
      }
    }

    onClick = (ev) => {
      if (this.state.visible && this.props.hideOnClick) {
        this.setState({visible: false});
      }
    }

    positionClass () {
      switch (this.props.position) {
        case 'top': return th.Tooltip_top;
        case 'right': return th.Tooltip_right;
        case 'bottom': return th.Tooltip_bottom;
        case 'left': return th.Tooltip_left;
        default: throw new Error('Error no such position');
      }
    }

    componentDidUpdate () {
      if (this.state.visible && this.state.firstTick === true) {
        setTimeout(() => this.setState({firstTick: false}), 5);
      }
    }

    render () {
      let { position, hideOnClick, tooltip, children, ...other } = this.props;
      let { visible, firstTick, style } = this.state;

      const className = cx(th.Tooltip, this.positionClass(), {
        [th.Tooltip_firstTick]: firstTick
      });

      return (
        <ComposedComponent
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onClick}
          {...other}>
          {children}
          { tooltip && visible ? (
            <Portal>
              <div className={className} style={style}>
                {tooltip}
              </div>
            </Portal>
          ) : null }
        </ComposedComponent>
      );
    }
  };
};

export const TTDiv = tooltipFactory('div', {position: 'top'});

export default tooltipFactory;

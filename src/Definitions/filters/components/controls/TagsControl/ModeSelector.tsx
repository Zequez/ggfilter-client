import * as React from 'react';
import * as th from './TagsControl.sass';
import rippleFactory from 'shared/components/Ripple';
import tooltipFactory from 'shared/components/Tooltip';

const Label = tooltipFactory(rippleFactory()('label'), {position: 'top'}) as any;

interface ModeSelectorProps {
  modes: string[];
  mode: string;
  onChange: (mode: string) => void;
}

export default class ModeSelector extends React.Component<ModeSelectorProps, null> {
  onClick = () => {
    let { mode, modes, onChange } = this.props;

    let newIndex = modes.indexOf(mode) + 1;
    if (newIndex === modes.length) newIndex = 0;

    onChange(modes[newIndex]);
  }

  render () {
    let { mode, modes } = this.props;

    let modeIndex = modes.indexOf(mode);
    let transform = {
      transform: `translateY(-${100 * modeIndex}%)`
    };

    return <Label className={th.__modeSelector} onClick={this.onClick} tooltip='AND/OR'>
      {modes.map((m) =>
        <span
          key={m}
          style={transform}>
          {m.toUpperCase()}
        </span>
      )}
    </Label>;
  }
}

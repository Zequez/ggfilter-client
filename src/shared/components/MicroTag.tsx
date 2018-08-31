import * as React from 'react';
import * as th from './MicroTag.sass';
import * as cx from 'classnames';
import Icon from 'shared/components/Icon';

interface MicroTagParams {
  tag: string;
  deco?: string;
  children?: any;
  onDelete?: () => void;
  onClick?: () => void;
  className: string;
  highlighted: boolean;
};

export default ({tag, deco, children, onDelete, onClick, className, highlighted, ...other}: MicroTagParams) => (
  <span onClick={onClick} className={cx(
    th.MicroTag, className, {
      [th.MicroTag_high]: highlighted,
      [th.MicroTag_deletable]: !!onDelete,
      [th.MicroTag_clickable]: !!onClick
    }
  )} {...other}>
    {tag}
    {children}
    {deco ? <span className={th.MicroTag__deco}>{deco}</span> : null}
    {onDelete ? (
      <Icon className={th.MicroTag__delete} icon='remove-tag' onClick={onDelete}/>
    ) : null}
  </span>
);

import * as React from 'react';
import * as th from './MicroTag.sass';
import * as cx from 'classnames';
import Icon from 'shared/components/Icon';

type MicroTagParams = {
  tag: string;
  deco?: string;
  children?: any;
  onDelete?: (tag: string) => void;
  onClick?: () => void;
  className?: string;
  alt?: boolean;
  highlighted?: boolean;
};

export default ({tag, deco, children, onDelete, onClick, className, highlighted, alt, ...other}: MicroTagParams) => (
  <span onClick={onClick} className={cx(
    th.MicroTag, className, {
      [th.MicroTag_high]: highlighted,
      [th.MicroTag_deletable]: !!onDelete,
      [th.MicroTag_clickable]: !!onClick,
      [th.MicroTag_alt]: !!alt,
    }
  )} {...other}>
    {tag}
    {children}
    {deco ? <span className={th.MicroTag__deco}>{deco}</span> : null}
    {onDelete ? (
      <Icon className={th.MicroTag__delete} icon='remove-tag' onClick={() => onDelete(tag)}/>
    ) : null}
  </span>
);

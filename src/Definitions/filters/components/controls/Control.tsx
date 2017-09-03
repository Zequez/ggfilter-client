import * as React from 'react';

type PropType = {
  options: {[key: string]: any},
  query: {[key: string]: any}
};

type StateType = null;

export abstract class Control<PT = PropType, ST = StateType> extends React.Component<PT, ST> {

};

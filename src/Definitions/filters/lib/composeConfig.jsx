import * as React from 'react';

export function composeConfig(Component, config) {
  return ((props) => <Component config={config} {...props}/>);
}

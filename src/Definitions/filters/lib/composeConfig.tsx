import * as React from 'react';

// export function composeConfig(Component, config) {
//   return ((props) => <Component config={config} {...props}/>);
// }

export function composeConfig(Comp, config) {
  return class ComposedConfigComponent extends React.Component {
    render () {
      return <Comp config={config} {...this.props}/>;
    }
  };
}

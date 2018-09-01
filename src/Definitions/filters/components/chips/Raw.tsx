import * as React from 'react';

export function Raw ({config}) {
  return (
    <div>"{config.query.value}"</div>
  );
}

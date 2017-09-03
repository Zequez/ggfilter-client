import * as React from 'react';

export function Raw ({query}) {
  return (
    <div>"{query.value}"</div>
  );
}

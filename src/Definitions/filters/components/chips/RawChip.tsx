import * as React from 'react';

export default function Raw ({query}) {
  return (
    <div>"{query.value}"</div>
  );
}

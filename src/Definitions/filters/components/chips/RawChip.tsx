import * as React from 'react';

export default function Raw ({config}) {
  return (
    <div>"{config.query.value}"</div>
  );
}

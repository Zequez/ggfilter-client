import React from 'react';
import renderer from 'react-test-renderer';
import { parseQuickInput } from './PriceCtrl.tsx';

describe('Operators', () => {
  it('should parse easy input', () => {
    expect(parseQuickInput('>5')).toEqual({gt: 5});
  })
})

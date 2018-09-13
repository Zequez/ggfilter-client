import { invert } from 'lodash';
import { Range } from '../../../../../Api';

const OPERATORS = {
  gt: '>',
  lt: '<',
  gte: '>=',
  lte: '<=',
  eq: '=',
};
const REVERSE_OPERATORS = invert(OPERATORS);

export function textToQuery (val: string): Range {
  let operations = [];
  val
    .trim()
    .replace(/[^.0-9>=<= ]/g, '')
    .split(/\s+/g)
    .map((v) => [v, v.match(/[0-9]/)]  as [string, RegExpMatchArray])
    .filter((v) => v[1])
    .map((v) => [v[0].slice(0, v[1].index), parseFloat(v[0].slice(v[1].index))] as [string, number])
    .forEach(([op, value]) => {
      if (REVERSE_OPERATORS[op] && !isNaN(value)) {
        if (op === '=') {
          operations.push(['gte', value * 100]);
          operations.push(['lte', value * 100]);
        } else {
          operations.push([REVERSE_OPERATORS[op], value * 100]);
        }
      }
    });

  operations = operations.slice(-2);

  let q = operations.reduce((query, [op, value]) => {
    query[op] = value;
    return query;
  }, {});

  return operations.length > 0 ? q : null;
}

export function queryToText (query: Range) {
  query = query || {};
  let text = [];
  if (query.gte != null && query.gte === query.lte) {
    text.push(`=${query.gte / 100}`);
  } else {
    for (let op in query) {
      text.push(`${OPERATORS[op]}${query[op] / 100}`);
    }
  }
  return text.join(' ');
}

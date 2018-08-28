import AnonFilter from './AnonFilter';
import * as filters from '../index';

export default class Filter extends AnonFilter {
  name: keyof typeof filters;
}

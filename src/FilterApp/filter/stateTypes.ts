import definitions, { FiltersNames } from '../../Definitions';
import { AnyQuery } from '../../Api';

export interface FilterConfig {
  query: AnyQuery | null;
  hl: boolean;
  column: boolean;
  sort: boolean | null;
}

export interface PartialFilterConfig {
  query?: {} | null;
  hl?: boolean;
  column?: boolean;
  sort?: boolean | null;
}

export type FiltersConfiguration = {
  [key in FiltersNames]: FilterConfig
};

export interface HyperFilter {
  sid: string;
  name: string;
  slug: string;
  parentId: number;
  ownershipHash: string;
  configuration: FiltersConfiguration;
}

export interface Game {
  id: number;
}

export interface State {
  sfilter: HyperFilter;
  sfilterError: string;
  sfilterLoading: boolean;

  filter: HyperFilter;
  ownershipHashes: {[k: string]: string};

  games: {
    batches: Game[][];
    loading: boolean;
    error: string;
    totalCount: number;
  };

  frontPageFilters: object[];
}

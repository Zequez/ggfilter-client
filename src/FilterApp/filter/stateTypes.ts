import definitions, { FiltersNames } from '../../Definitions';
import { AnyQuery } from '../../Api';

export interface FilterConfig {
  query: AnyQuery | null;
  hl: boolean;
  column: boolean;
  sort: boolean | null;
  fineTuned: boolean;
};

export interface PartialFilterConfig {
  query?: {} | null;
  hl?: boolean;
  column?: boolean;
  sort?: boolean | null;
  fineTuned?: boolean;
};

export type FiltersConfiguration = {
  [key in FiltersNames]: FilterConfig
};

export interface HyperFilter {
  sid: string;
  nameSlug: string;
  userId: string;
  name: string;
  configuration: FiltersConfiguration;
  parent: string;
};

export interface Game {
  id: number;
};

export interface State {
  sfilter: HyperFilter;
  sfilterError: string;
  sfilterLoading: boolean;

  filter: HyperFilter;

  games: {
    batches: Game[][];
    loading: boolean;
    error: string;
    totalCount: number;
  };

  frontPageFilters: object[];
};

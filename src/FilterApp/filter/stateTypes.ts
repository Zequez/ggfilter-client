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

export interface Filter {
  sid: string;
  nameSlug: string;
  userId: string;
  name: string;
  configuration: FiltersConfiguration;
};

export interface State {
  sfilter: Filter;
  sfilterError: string;
  sfilterLoading: boolean;

  filter: Filter;

  games: {
    batches: object[][];
    loading: boolean;
    error: string;
    totalCount: number;
  };

  frontPageFilters: object[];
};

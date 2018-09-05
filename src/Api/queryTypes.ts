export interface Exact {
  value: string;
  hl?: boolean;
}

export interface Range {
  gt?: number;
  lt?: number;
  gte?: number;
  lte?: number;
  hl?: boolean;
}

export interface Boolean {
  value: number;
  mode: 'and' | 'or' | 'xor';
  hl?: boolean;
}

export interface Tags {
  tags: string[];
  reject: string[];
  mode: 'and' | 'or' | 'xor';
  hl?: boolean;
}

export type AnyQuery = Exact | Range | Boolean | Tags;

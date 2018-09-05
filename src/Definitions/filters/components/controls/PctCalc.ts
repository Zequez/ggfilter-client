import { Range } from '../../../../Api';

export default class PctCalc {
  private gtRanges: number[];
  private ltRanges: number[];
  private labels: any[];
  private sticky: 'first' | 'last' | null = 'last';
  private interpolation: (n: any) => string = (n) => `${n}`;
  private pInterpolation = (n: any) => `p${n}`;

  constructor (divisions: number[], sticky: 'first' | 'last', interpolation?: (n: any) => string) {
    this.gtRanges = divisions;
    this.ltRanges = this.gtRanges.concat([100]);
    this.ltRanges.shift();
    if (sticky) this.sticky = sticky;
    if (interpolation) this.interpolation = interpolation;
  }

  setLabels (labels: string[]) {
    this.labels = labels;
  }

  eachBlock (cb: (block: number, size: number) => any) {
    return this.gtRanges.map((gt, i) => cb(i + 1, this.ltRanges[i] - gt));
  }

  query (start: number, end: number): Range {
    [start, end] = this.normalize(start, end);
    if (!start || !end || (start === 1 && end === this.ltRanges.length)) {
      return null;
    } else {
      return {gte: this.startToQuery(start), lt: this.endToQuery(end)};
    }
  }

  label (start: number, end: number) {
    [start, end] = this.normalize(start, end);
    return this.labels && start
      ? this.prettyRange(start, end, this.startToLabel(start), this.endToLabel(end), this.interpolation, false)
      : '';
  }

  pct (start: number, end: number) {
    [start, end] = this.normalize(start, end);
    return start ? this.prettyRange(start, end, this.startToPct(start), this.endToPct(end), this.pInterpolation, true) : '';
  }

  blocksFromQuery (query: Range) {
    return [this.queryToStart(query.gte), this.queryToEnd(query.lt)];
  }

  normalize (start: number, end: number) {
    if (start) {
      if (!end && this.sticky) end = this.sticky === 'last' ? this.ltRanges.length : 1;
      if (start > end) [start, end] = [end, start];
    }

    return [start, end];
  }

  private startToPct = (n: number) => n ? this.gtRanges[n - 1] : null;
  private endToPct = (n: number) => n ? this.ltRanges[n - 1] - 1 : null;
  private startToLabel = (n: number) => n ? this.labels[this.gtRanges[n - 1]] : null;
  private endToLabel = (n: number) => n ? this.labels[this.ltRanges[n - 1]] : null;
  private startToQuery = (n: number) => n ? this.gtRanges[n - 1] : null;
  private endToQuery = (n: number) => n ? this.ltRanges[n - 1] : null;
  private queryToStart = (n: number) => n != null ? this.gtRanges.indexOf(n) + 1 || null : null;
  private queryToEnd = (n: number) => n != null ? this.ltRanges.indexOf(n) + 1 || null : null;

  private prettyRange (s: number, e: number, sl: number, el: number, interpolator: (n: any) => string, pct: boolean) {
    if (s === 1 && e === this.ltRanges.length) {
      return 'All';
    } else if (s === 1) {
      return pct ? `≤${interpolator(el)}` : `<${interpolator(el)}`;
    } else if (e === this.ltRanges.length) {
      return `${interpolator(sl)}+`;
    } else if (sl === el) {
      return sl;
    } else {
      return pct ? `${interpolator(sl)}-${el}` : `${sl}-${interpolator(el)}`;
    }
  }
}

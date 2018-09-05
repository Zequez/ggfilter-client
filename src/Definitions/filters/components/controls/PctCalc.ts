import { Range } from '../../../../Api';

export default class PctCalc {
  private gtRanges: number[];
  private ltRanges: number[];
  private labels: string[];
  private sticky: boolean;

  constructor (divisions: number[], sticky: true) {
    this.gtRanges = divisions;
    this.ltRanges = this.gtRanges.concat([100]);
    this.ltRanges.shift();
    this.sticky = sticky;
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
      ? this.prettyRange(start, end, this.startToLabel(start), this.endToLabel(end))
      : '';
  }

  pct (start: number, end: number) {
    [start, end] = this.normalize(start, end);
    return start ? this.prettyRange(start, end, this.startToPct(start), this.endToPct(end)) : '';
  }

  blocksFromQuery (query: Range) {
    return [this.queryToStart(query.gte), this.queryToEnd(query.lt)];
  }

  normalize (start: number, end: number) {
    if (start) {
      if (!end && this.sticky) end = this.ltRanges.length;
      if (start > end) [start, end] = [end, start];
    }

    return [start, end];
  }

  private startToPct = (n: number) => n ? `${this.gtRanges[n - 1]}p` : null;
  private endToPct = (n: number) => n ? `${this.ltRanges[n - 1] - 1}p` : null;
  private startToLabel = (n: number) => n ? `${this.labels[this.gtRanges[n - 1]]}` : null;
  private endToLabel = (n: number) => n ? `${this.labels[this.ltRanges[n - 1]]}` : null;
  private startToQuery = (n: number) => n ? this.gtRanges[n - 1] : null;
  private endToQuery = (n: number) => n ? this.ltRanges[n - 1] : null;
  private queryToStart = (n: number) => n != null ? this.gtRanges.indexOf(n) + 1 : null;
  private queryToEnd = (n: number) => n != null ? this.ltRanges.indexOf(n) + 1 : null;

  private prettyRange (s: number, e: number, sl: string, el: string) {
    if (s === 1 && e === this.ltRanges.length) {
      return 'All';
    } else if (s === 1) {
      return `≤${el}`;
    } else if (e === this.ltRanges.length) {
      return `${sl}+`;
    } else if (sl === el) {
      return sl;
    } else {
      return `${sl}-${el}`;
    }
  }
}

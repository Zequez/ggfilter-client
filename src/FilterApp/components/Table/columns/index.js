module.exports = {
  Boolean: require('./BooleanColumn').default,
  Date: require('./DateColumn').default,
  Images: require('./ImagesColumn').default,
  Link: require('./LinkColumn').default,
  Price: require('./PriceColumn').default,
  Ratio: require('./RatioColumn').default,
  Raw: require('./RawColumn').default,
  SystemReq: require('./SystemReqColumn').default,
  Tags: require('./TagsColumn').default,
  TimeAgo: require('./TimeAgoColumn').default,
  SysreqTokensDetails: require('./SysreqTokensDetailsColumn').default,
  Toggle: require('./ToggleColumn').default,
  SysreqIndex: require('./SysreqIndexColumn').default
}

module.exports = {
  FancyRange: require('./FancyRangeFilter/FancyRangeFilter').default,
  Tags: require('./TagsFilter/TagsFilter').default,
  Boolean: require('./BooleanFilter').default,
  Null: require('./NullFilter').default,
  Number: require('./NumberFilter').default,
  Range: require('./RangeFilter').default,
  Text: require('./TextFilter').default
}

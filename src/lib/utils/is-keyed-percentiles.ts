import { AggregationsKeyedPercentiles, AggregationsPercentiles } from '@elastic/elasticsearch/lib/api/types'

export const isKeyedPercentiles = (value: AggregationsPercentiles): value is AggregationsKeyedPercentiles => !Array.isArray(value)

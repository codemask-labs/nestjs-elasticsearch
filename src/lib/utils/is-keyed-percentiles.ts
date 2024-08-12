import { AggregationsKeyedPercentiles, AggregationsPercentiles } from '@elastic/elasticsearch/lib/api/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isKeyedPercentiles = (value: AggregationsPercentiles): value is AggregationsKeyedPercentiles => !Array.isArray(value)

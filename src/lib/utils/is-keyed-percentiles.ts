import { AggregationsKeyedPercentiles, AggregationsPercentiles } from '@elastic/elasticsearch/lib/api/types'

/**
 * Type guard that returns `true` if the given Elasticsearch percentiles result is in keyed format
 * (i.e. an object with numeric string keys) rather than the array-of-objects format.
 * Use this before accessing percentile values to determine the correct access pattern.
 *
 * @param value - The raw percentiles aggregation result from an Elasticsearch response.
 * @returns `true` if `value` is `AggregationsKeyedPercentiles`, `false` if it is an array.
 */
export const isKeyedPercentiles = (value: AggregationsPercentiles): value is AggregationsKeyedPercentiles => !Array.isArray(value)

import { Document, Key } from 'lib/common'
import { ExtractEnumValues } from 'lib/utils'
import { CalendarIntervalName, CalendarIntervalQuantity } from 'lib/enums'

export type DateHistogramAggregationOptions = {
    /**
     * @description By default all buckets are returned, even those with 0 documents.
     */
    min_doc_count?: number
}

export type DateHistogramAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
    calendar_interval: ExtractEnumValues<CalendarIntervalName | CalendarIntervalQuantity>
}

export type DateHistogramAggregation<TDocument extends Document> = {
    date_histogram: DateHistogramAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `date_histogram` aggregation that groups documents into time-based
 * buckets using a calendar or fixed interval. Can also be used as a source inside
 * `getCompositeAggregation`.
 *
 * @param field - The date document field to bucket by.
 * @param interval - A calendar interval (e.g. `CalendarIntervalName.Day`) or fixed interval quantity string.
 * @param options - Optional settings such as `min_doc_count` to exclude empty buckets.
 * @returns A `DateHistogramAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getDateHistogramAggregation = <TDocument extends Document>(
    field: Key<TDocument>,
    interval: ExtractEnumValues<CalendarIntervalName | CalendarIntervalQuantity>,
    options?: DateHistogramAggregationOptions,
): DateHistogramAggregation<TDocument> => ({
    date_histogram: {
        field,
        calendar_interval: interval,
        ...options,
    },
})

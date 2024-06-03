import { Document, Key } from 'lib/common'
import { ExtractEnumValues } from 'lib/utils'
import { CalendarIntervalName, CalendarIntervalQuantity } from 'lib/enums'

export type DateHistogramAggregationOptions = {
    /**
     * @description By default all buckets between the first bucket that matches documents and the last one are returned.
     */
    min_doc_count?: number // eslint-disable-line camelcase
}

export type DateHistogramAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
    calendar_interval: ExtractEnumValues<CalendarIntervalName | CalendarIntervalQuantity>
}

export type DateHistogramAggregation<TDocument extends Document> = {
    date_histogram: DateHistogramAggregationBody<TDocument>
}

export const getDateHistogramAggregation = <TDocument extends Document>(
    field: Key<TDocument>,
    interval: ExtractEnumValues<CalendarIntervalName | CalendarIntervalQuantity>,
    options?: DateHistogramAggregationOptions
): DateHistogramAggregation<TDocument> => ({
    // eslint-disable-next-line camelcase
    date_histogram: {
        field,
        // note(przemyslaw): Q: is calendar_interval required in integration?
        // eslint-disable-next-line camelcase
        calendar_interval: interval,
        ...options
    }
})

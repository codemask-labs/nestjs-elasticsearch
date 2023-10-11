import { Document, Key } from 'lib/types'
import { CalendarIntervalName, CalendarIntervalQuantity } from 'lib/enums'

export type DateHistogramAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>,
    calendar_interval: CalendarIntervalName | CalendarIntervalQuantity
}

export type DateHistogramAggregation<TDocument extends Document> = {
    date_histogram: DateHistogramAggregationBody<TDocument>
}

export const getDateHistogramAggregation = <TDocument extends Document>(field: Key<TDocument>, interval: CalendarIntervalName | CalendarIntervalQuantity): DateHistogramAggregation<TDocument> => ({
    // eslint-disable-next-line camelcase
    date_histogram: {
        field,
        // note(przemyslaw): Q: is calendar_interval required in integration?
        // eslint-disable-next-line camelcase
        calendar_interval: interval
    }
})

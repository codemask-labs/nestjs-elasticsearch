import { Document, Field } from 'lib/types'
import { CalendarIntervalName, CalendarIntervalQuantity } from 'lib/enums'

export type DateHistogramAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>,
    calendar_interval: CalendarIntervalName | CalendarIntervalQuantity
}

export type DateHistogramAggregation<TDocument extends Document> = {
    date_histogram: DateHistogramAggregationBody<TDocument>
}

export const getDateHistogramAggregation = <TDocument extends Document>(field: Field<TDocument>, interval: CalendarIntervalName | CalendarIntervalQuantity): DateHistogramAggregation<TDocument> => ({
    date_histogram: {
        field,
        calendar_interval: interval
    }
})

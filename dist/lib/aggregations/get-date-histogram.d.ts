import { Document, Key } from '../types';
import { CalendarIntervalName, CalendarIntervalQuantity } from '../enums';
export type DateHistogramAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>;
    calendar_interval: CalendarIntervalName | CalendarIntervalQuantity;
};
export type DateHistogramAggregation<TDocument extends Document> = {
    date_histogram: DateHistogramAggregationBody<TDocument>;
};
export declare const getDateHistogramAggregation: <TDocument extends Document>(field: Key<TDocument>, interval: CalendarIntervalName | CalendarIntervalQuantity) => DateHistogramAggregation<TDocument>;

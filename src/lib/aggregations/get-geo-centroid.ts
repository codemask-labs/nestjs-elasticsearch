import { Document, Field } from 'lib/common'

export type GeoCentroidAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type GeoCentroidAggregation<TDocument extends Document> = {
    geo_centroid: GeoCentroidAggregationBody<TDocument>
}

export const getGeoCentroidAggregation = <TDocument extends Document>(field: Field<TDocument>): GeoCentroidAggregation<TDocument> => ({
    // eslint-disable-next-line camelcase
    geo_centroid: {
        field
    }
})

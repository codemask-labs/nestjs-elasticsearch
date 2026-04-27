import { is } from 'ramda'
import { Document, NumericField } from 'lib/common'

export type MaxAggregationScript = {
    script: string
}

export type MaxAggregationField<TDocument extends Document> = {
    field: NumericField<TDocument>
}

export type MaxAggregation<TDocument extends Document> = {
    max: MaxAggregationField<TDocument> | MaxAggregationScript
}

/**
 * Builds an Elasticsearch `max` aggregation that returns the maximum numeric value
 * from the specified field or a Painless script across all matching documents.
 *
 * @param fieldOrScript - A numeric document field name, or a `MaxAggregationScript` object with a Painless `script` string.
 * @returns A `MaxAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getMaxAggregation = <TDocument extends Document>(
    fieldOrScript: NumericField<TDocument> | MaxAggregationScript,
): MaxAggregation<TDocument> => {
    if (is(String, fieldOrScript) || is(Symbol, fieldOrScript) || is(Number, fieldOrScript)) {
        return { max: { field: fieldOrScript } }
    }

    return {
        max: fieldOrScript,
    }
}

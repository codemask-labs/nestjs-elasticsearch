import { is } from 'ramda'
import { Document, NumericField } from 'lib/common'

export type MinAggregationScript = {
    script: string
}

export type MinAggregationField<TDocument extends Document> = {
    field: NumericField<TDocument>
}

export type MinAggregation<TDocument extends Document> = {
    min: MinAggregationField<TDocument> | MinAggregationScript
}

/**
 * Builds an Elasticsearch `min` aggregation that returns the minimum numeric value
 * from the specified field or a Painless script across all matching documents.
 *
 * @param fieldOrScript - A numeric document field name, or a `MinAggregationScript` object with a Painless `script` string.
 * @returns A `MinAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getMinAggregation = <TDocument extends Document>(
    fieldOrScript: NumericField<TDocument> | MinAggregationScript,
): MinAggregation<TDocument> => {
    if (is(String, fieldOrScript) || is(Symbol, fieldOrScript) || is(Number, fieldOrScript)) {
        return { min: { field: fieldOrScript } }
    }

    return {
        min: fieldOrScript,
    }
}

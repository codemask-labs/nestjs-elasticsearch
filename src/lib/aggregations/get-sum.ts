import { is } from 'ramda'
import { Document, NumericField } from 'lib/common'

export type SumAggregationScript = {
    script: string
}

export type SumAggregationField<TDocument extends Document> = {
    field: NumericField<TDocument>
}

export type SumAggregation<TDocument extends Document> = {
    sum: SumAggregationField<TDocument> | SumAggregationScript
}

/**
 * Builds an Elasticsearch `sum` aggregation that computes the total sum of numeric values
 * from the specified field or a Painless script across all matching documents.
 *
 * @param fieldOrScript - A numeric document field name, or a `SumAggregationScript` object with a Painless `script` string.
 * @returns A `SumAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getSumAggregation = <TDocument extends Document>(
    fieldOrScript: NumericField<TDocument> | SumAggregationScript,
): SumAggregation<TDocument> => {
    if (is(String, fieldOrScript) || is(Symbol, fieldOrScript) || is(Number, fieldOrScript)) {
        return { sum: { field: fieldOrScript } }
    }

    return {
        sum: fieldOrScript,
    }
}

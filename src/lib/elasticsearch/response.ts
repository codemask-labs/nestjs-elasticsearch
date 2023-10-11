import { ApiResponse } from '@elastic/elasticsearch'
import { HitsMetadata } from '@elastic/elasticsearch/api/types'
import { ClassConstructor, Document } from 'lib/types'
import { Aggregations, AggregationsBody, TermsAggregation } from '..'

export type WithAggregations<TDocument extends Document> = {
    aggregations: AggregationsBody<TDocument>
}

export type ExtractTermsAggregation<TDocument extends Document> = {
    hello: 'world'
    document: TDocument
}

export type ExtractAggregation<
    TDocument extends Document,
    TAggregation extends Aggregations<TDocument>,
    TReturn
> = TAggregation extends WithAggregations<TDocument> ? TReturn & ExtractAggregations<TDocument, TAggregation['aggregations']> : TReturn

export type ExtractAggregations<TDocument extends Document, TAggregationsBody extends AggregationsBody<TDocument> = AggregationsBody<TDocument>> = {
    [AggregationName in keyof TAggregationsBody]: (
        TAggregationsBody[AggregationName] extends TermsAggregation<TDocument>
            ? ExtractAggregation<TDocument, TAggregationsBody[AggregationName], ExtractTermsAggregation<TDocument>>
            : `Extractor not found for aggregation name: ${AggregationName & string}`
    )
}

export type ElasticsearchResult<TDocument extends Document, TAggregationsBody extends AggregationsBody<TDocument>> = {
    hits: HitsMetadata<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations?: ExtractAggregations<TDocument, TAggregationsBody>
}

export type SearchResponse<TDocument extends Document, TAggregationsBody extends AggregationsBody<TDocument>> = {
    documents: Array<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations: ExtractAggregations<TDocument, TAggregationsBody>
}

export const getSearchResponse = <TDocument extends Document, TAggregationsBody extends AggregationsBody<TDocument>>(
    document: ClassConstructor<TDocument>,
    { body }: ApiResponse<ElasticsearchResult<TDocument, TAggregationsBody>>
): SearchResponse<TDocument, TAggregationsBody> => ({
    documents: body.hits.hits.reduce((result, { _source: source }) => {
        if (!source) {
            return result
        }

        return [...result, Object.assign(new document(), source)]
    }, [] as Array<TDocument>),
    aggregations: body.aggregations || {} as ExtractAggregations<TDocument, TAggregationsBody>
})

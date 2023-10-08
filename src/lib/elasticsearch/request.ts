import { Document } from 'lib/types'
import { BoolQuery } from '..'

export type SearchOptions<TDocument extends Document> = {
    size?: number
    body?: SearchRequestBody<TDocument>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SearchRequest<TDocument extends Document> = {
    index: string
}

export type SearchRequestBody<TDocument extends Document> = {
    query?: BoolQuery<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations?: Record<string, any>
}

export const getSearchRequest = <TDocument extends Document>(
    index: string,
    options?: SearchOptions<TDocument>
): SearchRequest<TDocument> & SearchOptions<TDocument> => ({
    index,
    ...options
})

import { Document } from 'lib/types'
import { SearchRequest } from './request'

export const getSearchResponse = <TDocument extends Document>(request: SearchRequest<TDocument>) => () => ({
    records: [],
    aggregations: []
})
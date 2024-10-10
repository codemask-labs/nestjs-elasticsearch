import { Document, Nullable } from 'lib/common'
import {
    BoolQuery,
    ExistsQuery,
    getTermQuery,
    getTermsQuery,
    MatchPhrasePrefixQuery,
    MustQuery,
    RangeQuery,
    TermQuery,
    TermsQuery
} from 'lib/queries'
import { isNil, reject } from 'ramda'
import { HomeDocument } from 'test/module'

export type QueriesBody<TDocument extends Document> =
    | BoolQuery<TDocument>
    | TermQuery<TDocument>
    | TermsQuery<TDocument>
    | RangeQuery<TDocument>
    | ExistsQuery<TDocument>
    | MatchPhrasePrefixQuery<TDocument>
    | MustQuery<TDocument>

export const isTermQuery = <T extends Document>(value: any): value is TermQuery<T> => {
    return true
}

export const getQueries = <TDocument extends Document>(filters: Array<QueriesBody<TDocument>>) => reject(isNil, filters)

const queries = getQueries<HomeDocument>([
    getTermQuery('address.keyword', null),
    getTermQuery('address.keyword', undefined),
    getTermQuery('address.keyword', '12'),
    getTermsQuery('animals.id', []),
    null,
    undefined
])

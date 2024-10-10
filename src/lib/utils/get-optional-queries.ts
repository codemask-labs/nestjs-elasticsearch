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

export type NullableQueriesBody<TDocument extends Document> =
    | Nullable<BoolQuery<TDocument>>
    | Nullable<TermQuery<TDocument>>
    | Nullable<TermsQuery<TDocument>>
    | Nullable<RangeQuery<TDocument>>
    | Nullable<ExistsQuery<TDocument>>
    | Nullable<MatchPhrasePrefixQuery<TDocument>>
    | Nullable<MustQuery<TDocument>>

export const isTermQuery = <T extends Document>(value: any): value is TermQuery<T> => {
    return true
}

export const getOptionalQueries = <TDocument extends Document>(filters: Array<NullableQueriesBody<TDocument>>) => reject(isNil, filters)

const queries = getOptionalQueries<HomeDocument>([
    getTermQuery('address.keyword', null),
    getTermQuery('address.keyword', undefined),
    getTermQuery('address.keyword', '12'),
    getTermsQuery('animals.id', []),
    null,
    undefined
])

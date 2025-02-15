import { Document, Nullable } from 'lib/common'
import { BoolQuery, ExistsQuery, MatchPhrasePrefixQuery, MustQuery, RangeQuery, TermQuery, TermsQuery } from 'lib/queries'
import { isNil, reject } from 'ramda'

export type QueriesBody<TDocument extends Document> =
    | BoolQuery<TDocument>
    | TermQuery<TDocument>
    | TermsQuery<TDocument>
    | RangeQuery<TDocument>
    | ExistsQuery<TDocument>
    | MatchPhrasePrefixQuery<TDocument>
    | MustQuery<TDocument>

export const getQueries = <TDocument extends Document>(filters: Array<Nullable<QueriesBody<TDocument>>>): Array<QueriesBody<TDocument>> =>
    reject(isNil, filters)

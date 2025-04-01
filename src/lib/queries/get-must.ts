import { Document } from 'lib/common'
import { QueriesBody } from 'lib/utils'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'
import { RangeQuery } from './get-range'
import { MatchQuery } from './get-match'
import { MatchPhrasePrefixQuery } from './get-match-phrase-prefix'
import { ExistsQuery } from './get-exists'

export type MustQueryBody<TDocument extends Document> =
    | QueriesBody<TDocument>
    | BoolQuery<TDocument>
    | TermQuery<TDocument>
    | TermsQuery<TDocument>
    | RangeQuery<TDocument>
    | MatchQuery<TDocument>
    | ExistsQuery<TDocument>
    | MatchPhrasePrefixQuery<TDocument>

export type MustQuery<TDocument extends Document> = {
    must: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>
}

export const getMustQuery = <TDocument extends Document>(must: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>): MustQuery<TDocument> => ({
    must,
})

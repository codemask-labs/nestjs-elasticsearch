import { Document } from 'lib/common'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'
import { RangeQuery } from './get-range'
import { MatchQuery } from './get-match'
import { MatchPhrasePrefixQuery } from './get-match-phrase-prefix'
import { ExistsQuery } from './get-exists'

export type ShouldQueryBody<TDocument extends Document> =
    | BoolQuery<TDocument>
    | TermQuery<TDocument>
    | TermsQuery<TDocument>
    | RangeQuery<TDocument>
    | MatchQuery<TDocument>
    | MatchPhrasePrefixQuery<TDocument>
    | ExistsQuery<TDocument>

export type ShouldQuery<TDocument extends Document> = {
    should: ShouldQueryBody<TDocument> | Array<ShouldQueryBody<TDocument>>
}

export const getShouldQuery = <TDocument extends Document>(
    should: ShouldQueryBody<TDocument> | Array<ShouldQueryBody<TDocument>>,
): ShouldQuery<TDocument> => ({
    should,
})

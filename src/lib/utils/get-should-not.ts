import { Document } from 'lib/types'
import { getBoolQuery, getMustNotQuery, getShouldQuery, MustNotQueryBody, ShouldQuery } from 'lib/queries'

export type ShouldNotQuery<TDocument extends Document> = ShouldQuery<TDocument>

// eslint-disable-next-line camelcase
export const getShouldNotQuery = <TDocument extends Document>(
    must_not: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>
): ShouldNotQuery<TDocument> => getShouldQuery(getBoolQuery(getMustNotQuery(must_not)))

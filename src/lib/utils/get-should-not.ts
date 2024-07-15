import { Document } from 'lib/common'
import { getBoolQuery, getMustNotQuery, getShouldQuery, MustNotQueryBody, ShouldQuery } from 'lib/queries'

export type ShouldNotQuery<TDocument extends Document> = ShouldQuery<TDocument>

export const getShouldNotQuery = <TDocument extends Document>(
    body: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>
): ShouldNotQuery<TDocument> => getShouldQuery(getBoolQuery(getMustNotQuery(body)))

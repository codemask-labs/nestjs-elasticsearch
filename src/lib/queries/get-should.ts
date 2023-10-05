import { Document } from 'lib/types'
import { getTermQuery } from './get-term'
import { getTermsQuery } from './get-terms'

export type ShouldQuery<TDocument extends Document> = ReturnType<typeof getTermQuery<TDocument>> | ReturnType<typeof getTermsQuery<TDocument>>

export const getShouldQuery = <TDocument extends Document>(should: ShouldQuery<TDocument> | Array<ShouldQuery<TDocument>>) => ({
    should
})

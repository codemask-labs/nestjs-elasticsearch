import { Document } from 'lib/types'
import { getTermQuery } from './get-term'
import { getTermsQuery } from './get-terms'

export type TermQuery<TDocument extends Document> = ReturnType<typeof getTermQuery<TDocument>>
export type TermsQuery<TDocument extends Document> = ReturnType<typeof getTermsQuery<TDocument>>
export type MustQuery<TDocument extends Document> = TermQuery<TDocument> | TermsQuery<TDocument>
export type ShouldQuery<TDocument extends Document> = TermQuery<TDocument> | TermsQuery<TDocument>

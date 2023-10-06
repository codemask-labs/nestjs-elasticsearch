import { Document } from 'lib/types'
import { getTermQuery } from './get-term'
import { getTermsQuery } from './get-terms'
import { getMustQuery } from './get-must'
import { getShouldQuery } from './get-should'
import { getBoolQuery } from './get-bool'

export type TermQuery<TDocument extends Document> = ReturnType<typeof getTermQuery<TDocument>>
export type TermsQuery<TDocument extends Document> = ReturnType<typeof getTermsQuery<TDocument>>
export type MustQuery<TDocument extends Document> = ReturnType<typeof getMustQuery<TDocument>>
export type ShouldQuery<TDocument extends Document> = ReturnType<typeof getShouldQuery<TDocument>>
export type BoolQuery<TDocument extends Document> = ReturnType<typeof getBoolQuery<TDocument>>

import { Document } from 'lib/types'
import { getMustQuery } from './get-must'
import { getShouldQuery } from './get-should'

export type BoolQuery<TDocument extends Document> = {
    must?: ReturnType<typeof getMustQuery<TDocument>>
    should?: ReturnType<typeof getShouldQuery<TDocument>>
}

export const getBoolQuery = <TDocument extends Document>(bool: BoolQuery<TDocument>) => ({
    bool
})

import { Document } from 'lib/types'
import { getBoolMustQuery } from './get-bool-must'
import { getBoolShouldQuery } from './get-bool-should'

export type BoolQuery<TDocument extends Document> = {
    must?: ReturnType<typeof getBoolMustQuery<TDocument>>
    should?: ReturnType<typeof getBoolShouldQuery<TDocument>>
}

export const getBoolQuery = <TDocument extends Document>(bool: BoolQuery<TDocument>) => ({
    bool
})

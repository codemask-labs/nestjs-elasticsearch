import { Document } from 'lib/types'
import { ShouldQuery } from './types'

export const getShouldQuery = <TDocument extends Document>(should: ShouldQuery<TDocument> | Array<ShouldQuery<TDocument>>) => ({
    should
})

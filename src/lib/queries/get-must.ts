import { Document } from 'lib/types'
import { MustQuery } from './types'

export const getMustQuery = <TDocument extends Document>(must: MustQuery<TDocument> | Array<MustQuery<TDocument>>) => ({
    must
})
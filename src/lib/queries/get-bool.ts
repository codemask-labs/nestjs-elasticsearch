import { Document } from 'lib/types'
import { BoolQuery } from './types'

export const getBoolQuery = <TDocument extends Document>(bool: BoolQuery<TDocument>) => ({
    bool
})

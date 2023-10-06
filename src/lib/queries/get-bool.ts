import { Document } from 'lib/types'
import { MustQuery, ShouldQuery } from './types'

type BoolQueryBody<TDocument extends Document> = MustQuery<TDocument> & ShouldQuery<TDocument>

export type MustQueryReturnType<TDocument extends Document> = {
    bool: BoolQueryBody<TDocument> | Array<BoolQueryBody<TDocument>>
}

export const getBoolQuery = <TDocument extends Document>(bool: BoolQueryBody<TDocument> | Array<BoolQueryBody<TDocument>>): MustQueryReturnType<TDocument> => ({
    bool
})

import { SearchHitsMetadata } from '@elastic/elasticsearch/lib/api/types'
import { ClassConstructor, Document } from 'lib/common'

export const getTransformedDocuments = <TDocument extends Document>(
    document: ClassConstructor<TDocument>,
    { hits }: SearchHitsMetadata<TDocument>
): Array<TDocument> =>
    hits.reduce<Array<TDocument>>((result, { _source: source }) => (!source ? result : [...result, Object.assign(new document(), source)]), [])

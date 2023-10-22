import { estypes } from '@elastic/elasticsearch'
import { ClassConstructor, Document } from 'lib/common'

export const getTransformedDocuments = <TDocument extends Document>(document: ClassConstructor<TDocument>, { hits }: estypes.HitsMetadata<TDocument>): Array<TDocument> => hits.reduce(
    (result, { _source: source }) => !source ? result : [...result, Object.assign(new document(), source)],
    [] as Array<TDocument>
)

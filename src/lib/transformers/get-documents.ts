import { estypes } from '@elastic/elasticsearch'
import { ClassConstructor, Document } from 'lib/common'
import { TDocumentWrapper } from './types'

export const getTransformedDocuments = <TDocument extends Document>(
    document: ClassConstructor<TDocument>,
    { hits }: estypes.HitsMetadata<TDocument>
): Array<TDocumentWrapper<TDocument>> =>
    hits.reduce<Array<TDocumentWrapper<TDocument>>>((result, currentItem) => {
        const { _source: source, sort } = currentItem

        if (!source) {
            return result
        }

        return [
            ...result,
            {
                source: Object.assign(new document(), source),
                sort
            }
        ]
    }, [])

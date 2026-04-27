import { SearchHitsMetadata } from '@elastic/elasticsearch/lib/api/types'
import { ClassConstructor, Document } from 'lib/common'
import { TDocumentWrapper } from './types'

/**
 * Transforms raw Elasticsearch hits into typed `TDocumentWrapper` objects.
 * Each hit's `_source` is instantiated as the document class (preserving prototype methods),
 * and the raw `sort` values are preserved for use with `search_after` pagination.
 * Hits without a `_source` are silently excluded.
 *
 * @param document - The document class constructor used to instantiate each hit's `_source`.
 * @param hits - The `hits` metadata object from the raw Elasticsearch search response.
 * @returns An array of `TDocumentWrapper<TDocument>` objects, each containing `source` and optional `sort`.
 */
export const getTransformedDocuments = <TDocument extends Document>(
    document: ClassConstructor<TDocument>,
    { hits }: SearchHitsMetadata<TDocument>,
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
                sort,
            },
        ]
    }, [])

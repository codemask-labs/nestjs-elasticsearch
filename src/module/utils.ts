import 'reflect-metadata'
import { is } from 'ramda'
import { ClassConstructor } from 'lib/common'
import { ELASTICSEARCH_INDEX_NAME_METADATA, ELASTICSEARCH_INDEX_PREFIX } from 'lib/constants'

export const isIndexRegistered = <T>(document: ClassConstructor<T>) => {
    const indexName = Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, document) as string | undefined

    return is(String, indexName)
}

export const getIndexName = <T>(nameOrDocument: string | ClassConstructor<T>) => {
    if (is(String, nameOrDocument)) {
        return nameOrDocument
    }

    if (!isIndexRegistered(nameOrDocument)) {
        throw new Error(`[${nameOrDocument.name}] Failed to get index name. Make sure the index is properly decorated with @RegisterIndex(name: string).`)
    }

    return Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, nameOrDocument) as string
}

export const getIndexInjectionToken = <T>(nameOrDocument: string | ClassConstructor<T>) =>
    `${ELASTICSEARCH_INDEX_PREFIX}:${getIndexName(nameOrDocument)}`

import 'reflect-metadata'
import { is, isNil } from 'ramda'
import { ClassConstructor } from 'lib/common'
import { ELASTICSEARCH_INDEX_NAME_METADATA, ELASTICSEARCH_INDEX_PREFIX } from 'lib/constants'

export const validateIndexName = <T>(document: ClassConstructor<T>) => {
    const indexName = Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, document) as string | undefined

    if (isNil(indexName)) {
        throw new Error(`[${document.name}] Failed to inject index. Make sure the index is properly decorated with @RegisterIndex(name: string).`)
    }
}

export const getIndexName = <T>(nameOrDocument: string | ClassConstructor<T>) => {
    if (is(String, nameOrDocument)) {
        return nameOrDocument
    }

    validateIndexName(nameOrDocument)

    return Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, nameOrDocument) as string
}

export const getIndexInjectionToken = <T>(nameOrDocument: string | ClassConstructor<T>) =>
    `${ELASTICSEARCH_INDEX_PREFIX}:${getIndexName(nameOrDocument)}`

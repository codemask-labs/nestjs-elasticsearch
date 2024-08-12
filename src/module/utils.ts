import 'reflect-metadata'
import { is } from 'ramda'
import { ClassConstructor } from 'lib/common'
import { ELASTICSEARCH_INDEX_NAME_METADATA, ELASTICSEARCH_INDEX_PREFIX } from 'lib/constants'

export const getIndexName = <T>(nameOrDocument: string | ClassConstructor<T>) => {
    if (is(String, nameOrDocument)) {
        return nameOrDocument
    }

    const indexName = Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, nameOrDocument)

    if (!indexName) {
        throw new Error(
            `[${nameOrDocument.name}] Failed to inject index. Make sure the index is properly decorated with @RegisterIndex(name: string).`
        )
    }

    return indexName
}

export const getIndexInjectionToken = <T>(nameOrDocument: string | ClassConstructor<T>) =>
    `${ELASTICSEARCH_INDEX_PREFIX}:${getIndexName(nameOrDocument)}`

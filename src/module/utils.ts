import 'reflect-metadata'
import { is } from 'ramda'
import { ClassConstructor } from 'lib/common'
import { ELASTICSEARCH_INDEX_NAME_METADATA, ELASTICSEARCH_INDEX_PREFIX } from 'lib/constants'

/**
 * Returns `true` if the given document class has been decorated with `@RegisterIndex`.
 *
 * @param document - The document class constructor to check.
 * @returns `true` if the class has a registered Elasticsearch index name, `false` otherwise.
 */
export const isIndexRegistered = <T>(document: ClassConstructor<T>) => {
    const indexName = Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, document) as string | undefined

    return is(String, indexName)
}

/**
 * Resolves the Elasticsearch index name from either a string or a document class.
 * When given a class, reads the name stored by `@RegisterIndex` from Reflect metadata.
 * Throws a descriptive error if the class is missing the `@RegisterIndex` decorator.
 *
 * @param nameOrDocument - A plain index name string, or a document class decorated with `@RegisterIndex`.
 * @returns The resolved Elasticsearch index name string.
 */
export const getIndexName = <T>(nameOrDocument: string | ClassConstructor<T>) => {
    if (is(String, nameOrDocument)) {
        return nameOrDocument
    }

    if (!isIndexRegistered(nameOrDocument)) {
        throw new Error(
            `[${nameOrDocument.name}] Failed to get index name. Make sure the index is properly decorated with @RegisterIndex(name: string).`,
        )
    }

    return Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, nameOrDocument) as string
}

/**
 * Returns the NestJS DI injection token used to register and resolve an `Index<TDocument>` provider.
 * The token is derived from the index name and is used internally by `forFeature` and `@InjectIndex`.
 *
 * @param nameOrDocument - A plain index name string, or a document class decorated with `@RegisterIndex`.
 * @returns The injection token string for the given index.
 */
export const getIndexInjectionToken = <T>(nameOrDocument: string | ClassConstructor<T>) =>
    `${ELASTICSEARCH_INDEX_PREFIX}:${getIndexName(nameOrDocument)}`

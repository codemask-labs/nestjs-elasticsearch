import 'reflect-metadata'
import { is, isEmpty, isNil } from 'ramda'
import { ELASTICSEARCH_INDEX_NAME_METADATA } from 'lib/constants'

/**
 * Class decorator that registers a document class as an Elasticsearch index.
 * Stores the index name in Reflect metadata so the module can resolve it at runtime.
 * Must be applied to every document class passed to `ElasticsearchModule.forFeature`.
 *
 * @param name - The Elasticsearch index name to associate with this document class.
 * @returns A class decorator that attaches the index name to the decorated class.
 *
 * @example
 * ```ts
 * @RegisterIndex('homes')
 * class HomeDocument {
 *   title: string
 * }
 * ```
 */
export const RegisterIndex =
    (name: string) =>
    <T>(constructor: new () => T): new () => T => {
        if (!is(String, name) || isNil(name) || isEmpty(name)) {
            throw new Error(
                `[${constructor.name}] Failed to register due to index name being null, undefined or empty. Please provide name to @RegisterIndex(name: string).`,
            )
        }

        Reflect.defineMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, name, constructor)

        return constructor
    }

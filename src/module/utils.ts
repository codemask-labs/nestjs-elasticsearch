import { is } from 'ramda'
import { ClassConstructor } from 'lib/common'
import { ELASTICSEARCH_INDEX_NAME_METADATA, ELASTICSEARCH_INDEX_PREFIX } from 'lib/constants'

export const getIndexInjectionToken = <T>(nameOrDocument: string | ClassConstructor<T>) => {
    if (is(String, nameOrDocument)) {
        return `${ELASTICSEARCH_INDEX_PREFIX}:${nameOrDocument}`
    }

    const index = Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, nameOrDocument)

    if (!index) {
        throw new Error(
            `[${nameOrDocument.name}] Failed to inject index. Make sure the Schema is properly decorated with @RegisterIndex(name: string).`
        )
    }

    return `${ELASTICSEARCH_INDEX_PREFIX}:${index}`
}

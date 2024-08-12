import 'reflect-metadata'
import { is, isEmpty, isNil } from 'ramda'
import { ELASTICSEARCH_INDEX_NAME_METADATA } from 'lib/constants'

export const RegisterIndex =
    (name: string) =>
    <T>(constructor: new () => T): new () => T => {
        if (!is(String, name) || isNil(name) || isEmpty(name)) {
            throw new Error(
                `[${constructor.name}] Failed to register due to index name being null, undefined or empty. Please provide name to @RegisterIndex(name: string).`
            )
        }

        Reflect.defineMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, name, constructor)

        return constructor
    }

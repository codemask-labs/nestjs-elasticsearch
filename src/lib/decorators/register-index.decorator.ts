import { ELASTICSEARCH_INDEX_NAME_METADATA } from 'lib/constants'

export const RegisterIndex =
    (name: string) =>
    <T>(constructor: new () => T): new () => T => {
        Reflect.defineMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, name, constructor)

        return constructor
    }

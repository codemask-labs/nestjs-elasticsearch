import { ELASTICSEARCH_CATALOG_NAME } from 'lib/constants'

export const Catalog = (name: string) => <T>(constructor: new () => T): new () => T => {
    Reflect.defineMetadata(ELASTICSEARCH_CATALOG_NAME, name, constructor)

    return constructor
}

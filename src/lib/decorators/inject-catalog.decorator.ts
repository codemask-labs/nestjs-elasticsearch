import { Inject } from '@nestjs/common'
import { ELASTICSEARCH_CATALOG_NAME } from 'lib/constants'
import { ClassConstructor, Document } from 'lib/types'
import { getCatalogInjectionToken } from 'nestjs/utils'

export const InjectCatalog = <TDocument extends Document>(document: ClassConstructor<TDocument>) => {
    const index = Reflect.getMetadata(ELASTICSEARCH_CATALOG_NAME, document)

    if (!index) {
        throw new Error('Failed to find registered catalog index')
    }

    return Inject(getCatalogInjectionToken(index))
}

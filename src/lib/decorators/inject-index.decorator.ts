import { Inject } from '@nestjs/common'
import { ELASTICSEARCH_INDEX_NAME_METADATA } from 'lib/constants'
import { ClassConstructor, Document } from 'lib/common'
import { getIndexInjectionToken } from 'module/utils'

export const InjectIndex = <TDocument extends Document>(document: ClassConstructor<TDocument>) => {
    const index = Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, document)

    if (!index) {
        throw new Error('Failed to find registered catalog index')
    }

    return Inject(getIndexInjectionToken(index))
}

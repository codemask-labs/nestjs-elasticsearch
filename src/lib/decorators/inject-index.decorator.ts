import { Inject } from '@nestjs/common'
import { ClassConstructor, Document } from 'lib/common'
import { getIndexInjectionToken } from 'module/utils'

export const InjectIndex = <TDocument extends Document>(document: ClassConstructor<TDocument>) => Inject(getIndexInjectionToken(document))

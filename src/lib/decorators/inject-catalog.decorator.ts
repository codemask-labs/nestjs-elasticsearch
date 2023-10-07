import { Inject } from '@nestjs/common'
import { getCatalogInjectionToken } from 'nestjs/utils'

export const InjectCatalog = (index: string) => Inject(getCatalogInjectionToken(index))

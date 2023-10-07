import { ELASTICSEARCH_CATALOG_PREFIX } from 'lib/constants'

export const getCatalogInjectionToken = (index: string) => `${ELASTICSEARCH_CATALOG_PREFIX}:${index}`

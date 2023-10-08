import { ELASTICSEARCH_INDEX_PREFIX } from 'lib/constants'

export const getIndexInjectionToken = (index: string) => `${ELASTICSEARCH_INDEX_PREFIX}:${index}`

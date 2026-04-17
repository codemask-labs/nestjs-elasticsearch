import 'reflect-metadata'
import { Inject } from '@nestjs/common'
import { ClassConstructor, Document } from 'lib/common'
import { getIndexInjectionToken } from 'module/utils'

/**
 * Property decorator that injects a typed `Index<TDocument>` instance into a NestJS service.
 * The document class must be registered with `ElasticsearchModule.forFeature` in the consuming module.
 *
 * @param document - The document class decorated with `@RegisterIndex` to inject.
 * @returns A NestJS `@Inject` decorator bound to the correct injection token for the given document.
 *
 * @example
 * ```ts
 * @InjectIndex(HomeDocument)
 * private readonly homeIndex: Index<HomeDocument>
 * ```
 */
export const InjectIndex = <TDocument extends Document>(document: ClassConstructor<TDocument>) => Inject(getIndexInjectionToken(document))

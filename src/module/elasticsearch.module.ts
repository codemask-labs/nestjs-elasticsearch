import { ClientOptions } from '@elastic/elasticsearch'
import { ElasticsearchModule as BaseElasticsearchModule } from '@nestjs/elasticsearch'
import { Module, DynamicModule, Provider } from '@nestjs/common'
import { ClassConstructor } from 'lib/common'
import { Index } from './injectables'
import { ElasticsearchService } from './elasticsearch.service'
import { getIndexInjectionToken } from './utils'
import { AsyncModuleOptions } from './types'

@Module({})
export class ElasticsearchModule {
    /**
     * Registers the Elasticsearch module synchronously with static client options.
     * The module is registered globally by default.
     *
     * @param options - Elasticsearch client options (e.g. `node`, `auth`, `tls`).
     * @returns A dynamic NestJS module with `ElasticsearchService` exported globally.
     */
    static register(options: ClientOptions): DynamicModule {
        return {
            global: true, // todo: make it optional
            module: ElasticsearchModule,
            imports: [BaseElasticsearchModule.register(options)],
            providers: [ElasticsearchService],
            exports: [ElasticsearchService],
        }
    }

    /**
     * Registers the Elasticsearch module asynchronously, e.g. with `useFactory` or `useClass`.
     * Supports async configuration from environment variables or config services.
     *
     * @param options - Async module options including `useFactory`, `inject`, and optional `global` flag.
     * @returns A dynamic NestJS module with `ElasticsearchService` exported.
     */
    static registerAsync(options: AsyncModuleOptions): DynamicModule {
        return {
            global: options.global ?? true,
            module: ElasticsearchModule,
            imports: [BaseElasticsearchModule.registerAsync(options)],
            providers: [ElasticsearchService],
            exports: [ElasticsearchService],
        }
    }

    /**
     * Registers document classes as injectable `Index<TDocument>` providers in the current module.
     * Each document class must be decorated with `@RegisterIndex`. Call this in the feature module
     * that owns the document, then inject with `@InjectIndex(MyDocument)`.
     *
     * @param documents - Array of document classes decorated with `@RegisterIndex`.
     * @returns A dynamic NestJS module exporting one `Index<TDocument>` provider per document class.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static forFeature(documents: Array<ClassConstructor<any>>): DynamicModule {
        const providers: Array<Provider> = documents.map(document => ({
            inject: [ElasticsearchService],
            provide: getIndexInjectionToken(document),
            useFactory: (service: ElasticsearchService) => new Index(service, document),
        }))

        return {
            module: ElasticsearchModule,
            providers,
            exports: providers,
        }
    }
}

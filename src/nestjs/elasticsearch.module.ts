import { ClientOptions } from '@elastic/elasticsearch'
import { ElasticsearchModule as BaseElasticsearchModule } from '@nestjs/elasticsearch'
import { Module, DynamicModule, Provider } from '@nestjs/common'
import { ClassConstructor } from 'lib/types'
import { ELASTICSEARCH_CATALOG_NAME } from 'lib/constants'
import { Catalog } from './injectables'
import { ElasticsearchService } from './elasticsearch.service'
import { getCatalogInjectionToken } from './utils'

@Module({})
export class ElasticsearchModule {
    static register(options: ClientOptions): DynamicModule {
        return {
            global: true, // todo: make it optional
            module: ElasticsearchModule,
            imports: [BaseElasticsearchModule.register(options)],
            providers: [ElasticsearchService],
            exports: [ElasticsearchService]
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static forFeature(documents: Array<ClassConstructor<any>>): DynamicModule {
        const providers: Array<Provider> = documents.map(document => {
            const index = Reflect.getMetadata(ELASTICSEARCH_CATALOG_NAME, document)

            if (!index) {
                throw new Error(`Class (${document.toString()}) is not registered with @Catalog(name: string) decorator!`)
            }

            return {
                inject: [ElasticsearchService],
                provide: getCatalogInjectionToken(index),
                useFactory: (service: ElasticsearchService) => new Catalog(service, document)
            }
        })

        return {
            module: ElasticsearchModule,
            providers,
            exports: providers
        }
    }
}

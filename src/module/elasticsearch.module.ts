import { ClientOptions } from '@elastic/elasticsearch'
import { ElasticsearchModule as BaseElasticsearchModule } from '@nestjs/elasticsearch'
import { Module, DynamicModule, Provider } from '@nestjs/common'
import { ClassConstructor } from 'lib/common'
import { Index } from './injectables'
import { ElasticsearchService } from './elasticsearch.service'
import { getIndexInjectionToken } from './utils'

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
        const providers: Array<Provider> = documents.map(document => ({
            inject: [ElasticsearchService],
            provide: getIndexInjectionToken(document),
            useFactory: (service: ElasticsearchService) => new Index(service, document)
        }))

        return {
            module: ElasticsearchModule,
            providers,
            exports: providers
        }
    }
}

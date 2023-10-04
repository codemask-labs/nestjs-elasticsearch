import { ClientOptions } from '@elastic/elasticsearch'
import { ElasticsearchModule as BaseElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch'
import { Module, DynamicModule } from '@nestjs/common'
import { Catalog } from './injectables'
import { ClassConstructor } from 'lib/types'

@Module({})
export class ElasticsearchModule {
    static register(options: ClientOptions): DynamicModule {
        return {
            global: true,
            module: ElasticsearchModule,
            imports: [BaseElasticsearchModule.register(options)],
            exports: [ElasticsearchService]
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static forFeature(catalogs: Array<ClassConstructor<any>>): DynamicModule {
        console.log(catalogs)

        return {
            module: ElasticsearchModule,
            providers: [Catalog],
            exports: [Catalog]
        }
    }
}

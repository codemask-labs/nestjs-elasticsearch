import { ClientOptions } from '@elastic/elasticsearch';
import { DynamicModule } from '@nestjs/common';
import { ClassConstructor } from '../lib/types';
export declare class ElasticsearchModule {
    static register(options: ClientOptions): DynamicModule;
    static forFeature(documents: Array<ClassConstructor<any>>): DynamicModule;
}

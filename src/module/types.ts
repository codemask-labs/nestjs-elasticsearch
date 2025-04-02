import { DynamicModule, InjectionToken, Type } from '@nestjs/common'
import { ClientOptions } from '@elastic/elasticsearch'

export type AsyncModuleOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule>>
    global?: boolean
    inject?: Array<InjectionToken>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useFactory: (...args: Array<any>) => Promise<ClientOptions> | ClientOptions
}

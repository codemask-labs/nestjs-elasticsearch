import { Type, INestApplication, ModuleMetadata } from '@nestjs/common'
import { TestingModuleBuilder, TestingModule } from '@nestjs/testing'

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export type NestModuleTokens<TInput = any> = Type<TInput> | Function | string | symbol

export type TestToolkitSetup = ModuleMetadata & {
    teardown?: 'all' | 'each'
    withBuilder?: (builder: TestingModuleBuilder) => void | Promise<void>
    withTestingModule?: (module: TestingModule) => void | Promise<void>
    withApplication?: (app: INestApplication) => void | Promise<void>
}

export interface TestToolkitFixture {
    builder: TestingModuleBuilder
}

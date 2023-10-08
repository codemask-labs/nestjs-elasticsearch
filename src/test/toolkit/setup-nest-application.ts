import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { NestModuleTokens, TestToolkitSetup } from './types'

export const setupNestApplication = (setup: TestToolkitSetup) => {
    const { teardown, withBuilder, withTestingModule, withApplication, ...metadata } = setup

    // eslint-disable-next-line functional/no-let
    let app: INestApplication
    const builder = Test.createTestingModule(metadata)

    const createNestApplication = async () => {
        if (withBuilder) {
            await withBuilder(builder)
        }

        const module = await builder.compile()

        if (withTestingModule) {
            await withTestingModule(module)
        }

        app = module.createNestApplication()

        if (withApplication) {
            await withApplication(app)
        }

        app = await app.init()
    }

    const destroyNestApplication = async () => {
        if (app) {
            await app.close()
        }
    }

    if (!teardown || teardown === 'all') {
        beforeAll(createNestApplication)
        afterAll(destroyNestApplication)
    }

    if (teardown === 'each') {
        beforeEach(createNestApplication)
        afterEach(destroyNestApplication)
    }

    return {
        app: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
            get: <T = any>(token: NestModuleTokens<T>) => app.get<T>(token)
        },
        withHttpRequest: () => request(app.getHttpServer())
    }
}

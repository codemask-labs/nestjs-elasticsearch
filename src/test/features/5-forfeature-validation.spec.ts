import { Test } from '@nestjs/testing'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'

/**
 * Bug (fixed): ElasticsearchService.getIndex() failed silently when passed a class
 * without @RegisterIndex. The error only surfaced lazily at call-time inside .search().
 *
 * Fix: getIndex() is now throwing immediately when the document is not decorated with @RegisterIndex.
 */

// Intentionally NOT decorated with @RegisterIndex
class UnregisteredDocument { }

describe('forFeature validation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE,
            }),
        ],
    })

    it('getIndex() throws immediately when document has no @RegisterIndex', () => {
        const service = app.get(ElasticsearchService)

        expect(() => service.getIndex(UnregisteredDocument)).toThrow(
            `[${UnregisteredDocument.name}] Failed to inject index. Make sure the index is properly decorated with @RegisterIndex(name: string).`,
        )
    })
})

describe('forFeature validation - startup failure', () => {
    it('app fails to initialise when a provider uses getIndex() with an unregistered document', async () => {
        const testingModule = Test.createTestingModule({
            imports: [
                ElasticsearchModule.register({
                    node: TEST_ELASTICSEARCH_NODE,
                }),
            ],
            providers: [
                {
                    provide: 'UNREGISTERED_INDEX',
                    inject: [ElasticsearchService],
                    useFactory: (service: ElasticsearchService) => service.getIndex(UnregisteredDocument),
                },
            ],
        })

        await expect(testingModule.compile()).rejects.toThrow(
            `[${UnregisteredDocument.name}] Failed to inject index. Make sure the index is properly decorated with @RegisterIndex(name: string).`,
        )
    })
})

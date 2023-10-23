import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { HealthStatus } from 'lib/enums'

describe('Making a search', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('has service available', () => {
        const service = app.get(ElasticsearchService)

        expect(service).toBeDefined()
    })

    it('health of a cluster being one of the HealthStatus enum', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.getClusterHealth()
        const statuses = Object.values(HealthStatus)

        expect(statuses.includes(result.status)).toBeTruthy()
    })
})

import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'nestjs/elasticsearch.module'
import { ElasticsearchService } from 'nestjs/elasticsearch.service'
import { HealthStatus } from 'lib/enums'

describe('Making a search', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: 'http://localhost:9200'
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
        const statues = Object.values(HealthStatus)

        expect(statues.includes(result.status)).toBeTruthy()
    })
})

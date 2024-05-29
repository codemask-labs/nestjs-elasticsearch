import { HomeDocument } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getExistsQuery } from './get-exists'

describe('getExistsQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema fields', () => {
        const query = getExistsQuery<HomeDocument>('address')

        expect(query).toEqual({
            exists: {
                field: 'address'
            }
        })
    })

    it('queries es for range aggregation with nested aggregation', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 2,
            query: {
                bool: {
                    must: getExistsQuery('propertyAreaSquared')
                }
            }
        })

        expect(result.documents).toEqual([
            {
                address: '295 Erich Prairie',
                builtInYear: 1998,
                city: 'Port Marcia',
                fullName: 'Stephanie Becker',
                hasProperty: true,
                id: 'f7f26310-78bf-4da8-80e4-b4e9b8f5ab3b',
                ownerEmail: 'Austen.Bogan@hotmail.com',
                propertyAreaSquared: 941576,
                propertyAreaSquaredAsString: '941576',
                propertyType: 'Apartment'
            },
            {
                address: '7403 Lavada Meadows',
                builtInYear: 1995,
                city: 'St. Joseph',
                fullName: 'Erica O\'Keefe',
                hasProperty: true,
                id: '350f0993-0b0b-47a0-8700-ee71f6b4c1c7',
                ownerEmail: 'Aylin_Schneider@gmail.com',
                propertyAreaSquared: 962998,
                propertyAreaSquaredAsString: '962998',
                propertyType: 'Flat'
            }
        ])
    })
})

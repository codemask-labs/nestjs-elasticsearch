import { ResponseError } from 'lib/common'
import { HomeDocument } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getRangeQuery } from '../get-range'
import { getBoolQuery } from '../get-bool'
import { getMustQuery } from '../get-must'

describe('getRangeQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE,
            }),
        ],
    })

    it('accepts only schema fields', () => {
        const query = getRangeQuery<HomeDocument>('propertyAreaSquared', {
            gte: 150,
            lte: 250,
        })

        expect(query).toEqual({
            range: {
                propertyAreaSquared: { gte: 150, lte: 250 },
            },
        })
    })

    it(`should query elasticsearch for range query with 'gt' option`, async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getRangeQuery('propertyAreaSquared', {
                        gt: 10000,
                    }),
                ),
            ),
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.propertyAreaSquared).toBeGreaterThan(10000))
    })

    it(`should query elasticsearch for range query with 'gte' option`, async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getRangeQuery('propertyAreaSquared', {
                        gt: 20000,
                    }),
                ),
            ),
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.propertyAreaSquared).toBeGreaterThanOrEqual(20000))
    })

    it(`should query elasticsearch for range query with 'lt' option`, async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getRangeQuery('propertyAreaSquared', {
                        lt: 70000,
                    }),
                ),
            ),
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.propertyAreaSquared).toBeLessThan(70000))
    })

    it(`should query elasticsearch for range query with 'lte' option`, async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getRangeQuery('propertyAreaSquared', {
                        lte: 70000,
                    }),
                ),
            ),
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.propertyAreaSquared).toBeLessThanOrEqual(70000))
    })

    it(`should query elasticsearch for range query with gte' and 'lte' option`, async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getRangeQuery('propertyAreaSquared', {
                        gte: 10000,
                        lte: 80000,
                    }),
                ),
            ),
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.propertyAreaSquared).toBeGreaterThanOrEqual(10000))
        result.documents.forEach(document => expect(document.source.propertyAreaSquared).toBeLessThanOrEqual(80000))
    })

    it('should query elasticsearch for range query with format option', async () => {
        const service = app.get(ElasticsearchService)

        const gteContractDate = '2023-05-01'
        const lteContractDate = '2023-10-01'

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getRangeQuery('contractDate', {
                        gte: gteContractDate,
                        lte: lteContractDate,
                        format: 'yyyy-MM-dd',
                    }),
                ),
            ),
        })

        expect(result.total).toBeGreaterThan(0)

        result.documents.forEach(result => {
            const contractDate = result.source.contractDate

            if (!contractDate) {
                expect(contractDate).toBeDefined()

                return
            }

            expect(new Date(contractDate).getTime()).toBeGreaterThanOrEqual(new Date(gteContractDate).getTime())
            expect(new Date(contractDate).getTime()).toBeLessThanOrEqual(new Date(lteContractDate).getTime())
        })
    })

    it('should return an error when passing an invalid parameter with format option', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 10,
                query: getBoolQuery(
                    getMustQuery(
                        getRangeQuery('contractDate', {
                            gte: '2023-05-01',
                            lte: '2023-10-01',
                            format: `yyyy-MM-dd'T'HH:mm:ss.SSSZ`,
                        }),
                    ),
                ),
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('parse_exception')
                expect(error.message).toContain(
                    `failed to parse date field [2023-05-01] with format [yyyy-MM-dd'T'HH:mm:ss.SSSZ]: [failed to parse date field [2023-05-01] with format [yyyy-MM-dd'T'HH:mm:ss.SSSZ]]`,
                )
            })
    })
})

import { Injectable } from '@nestjs/common'
import { InjectIndex } from 'lib/decorators'
import { getBoolQuery, getTermQuery, getTermsQuery } from 'lib/queries'
import { getAvgAggregation, getTermsAggregation } from 'lib/aggregations'
import { Index } from 'module/injectables'
import { PropertyType } from './enums'
import { HomeDocument } from './home.document'

@Injectable()
export class TestService {
    @InjectIndex(HomeDocument)
    private readonly homes: Index<HomeDocument>

    getHomeDocuments() {
        return this.homes.search({
            size: 10,
            query: getBoolQuery({
                must: [
                    getTermQuery('propertyType.keyword', PropertyType.Flat),
                    getTermsQuery('propertyType.keyword', [PropertyType.Apartment, PropertyType.Flat])
                ]
            })
        })
    }

    getTopAddressesWithHighestAverageAreaSquared(size: number = 3) {
        return this.homes.search({
            size: 0,
            aggregations: {
                a: getTermsAggregation('city.keyword'),
                b: {
                    ...getTermsAggregation('city.keyword'),
                    aggs: {
                        averageSquareMeters: getAvgAggregation('propertyAreaSquared')
                    }
                },
                homes: {
                    ...getTermsAggregation('address.keyword', size),
                    aggregations: {
                        averageSquareMeters: getAvgAggregation('propertyAreaSquared')
                    }
                }
            }
        })
    }
}

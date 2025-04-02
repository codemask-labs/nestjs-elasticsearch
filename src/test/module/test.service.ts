import { Injectable } from '@nestjs/common'
import { InjectIndex } from 'lib/decorators'
import { getBoolQuery, getTermQuery, getTermsQuery } from 'lib/queries'
import { getAvgAggregation, getTermsAggregation } from 'lib/aggregations'
import { getSearchRequest } from 'lib/requests'
import { Index } from 'module/injectables'
import { PropertyType } from './enums'
import { HomeDocument } from './home.document'

@Injectable()
export class TestService {
    @InjectIndex(HomeDocument)
    private readonly homes: Index<HomeDocument>

    getHomeDocuments() {
        const request = getSearchRequest(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                must: [
                    getTermQuery('propertyType.keyword', PropertyType.Flat),
                    getTermsQuery('propertyType.keyword', [PropertyType.Apartment, PropertyType.Flat]),
                ],
            }),
        })

        return this.homes.search(request)
    }

    getTopAddressesWithHighestAverageAreaSquared(size: number = 3) {
        const request = getSearchRequest(HomeDocument, {
            size: 0,
            aggregations: {
                cities: getTermsAggregation('city.keyword'),
                citiesWithAverageAreaSquared: {
                    ...getTermsAggregation('city.keyword'),
                    aggs: {
                        averageSquareMeters: getAvgAggregation('propertyAreaSquared'),
                    },
                },
                homes: {
                    ...getTermsAggregation('address.keyword', size),
                    aggregations: {
                        averageSquareMeters: getAvgAggregation('propertyAreaSquared'),
                    },
                },
            },
        })

        return this.homes.search(request)
    }
}

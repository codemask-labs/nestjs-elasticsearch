import { Injectable } from '@nestjs/common'
import { InjectIndex } from 'lib/decorators'
import { getAvgAggregation, getSumAggregation, getTermsAggregation } from 'lib/aggregations'
import { getBoolQuery, getTermQuery, getTermsQuery } from 'lib/queries'
import { Index } from 'nestjs/injectables'
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
            }),
            aggregations: {
                addresses: {
                    ...getTermsAggregation('address.keyword'),
                    aggregations: {
                        test: {
                            ...getSumAggregation('propertyAreaSquared'),
                            aggregations: {
                                hello: getAvgAggregation('propertyAreaSquared')
                            }
                        }
                    }
                }
            }
        })
            .then(result => {
                console.log('result:', result.aggregations)

                result.aggregations.addresses.aggregations.test.sum.field
                result.aggregations.addresses.aggregations.test.aggregations.hello
                result.aggregations.addresses.terms.field

                return result
            })
    }
}

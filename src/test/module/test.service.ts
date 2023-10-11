import { Injectable } from '@nestjs/common'
import { InjectIndex } from 'lib/decorators'
import { getBoolQuery, getTermQuery, getTermsQuery } from 'lib/queries'
import { getAggregations, getTermsAggregation } from 'lib/aggregations'
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
                test: {
                    terms: { field: 'address.keyword', size: 10 },
                    ...getAggregations({
                        homeTypes: getTermsAggregation('propertyType.keyword')
                    })
                }
            }
        })
            .then(result => {
                console.log('result:', result.aggregations)

                result.aggregations.test

                // result.aggregations?.test.hello.hasProperty

                // result.aggregations?.count

                return result
            })
    }
}

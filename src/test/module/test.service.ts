import { Injectable } from '@nestjs/common'
import { InjectIndex } from 'lib/decorators'
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
            })
        })
    }
}

import { Injectable } from '@nestjs/common'
import { InjectCatalog } from 'lib/decorators'
import { getBoolQuery, getTermQuery } from 'lib/queries'
import { Catalog } from 'nestjs/injectables'
import { PropertyType } from './enums'
import { HomeDocument } from './homes.catalog'

@Injectable()
export class TestService {
    @InjectCatalog(HomeDocument)
    private readonly homes: Catalog<HomeDocument>

    getHomeDocuments() {
        return this.homes.search({
            size: 10,
            body: {
                query: getBoolQuery({
                    must: [
                        getTermQuery('propertyType.keyword', PropertyType.Flat)
                    ]
                })
            }
        })
    }
}

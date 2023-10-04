import { Injectable } from '@nestjs/common'
import { ElasticsearchService as BaseElasticsearchService } from '@nestjs/elasticsearch'
import { ClassConstructor, Document } from 'lib/types'

@Injectable()
export class Catalog<TDocument extends Document> {
    constructor(
        private readonly document: ClassConstructor<TDocument>,
        private readonly es: BaseElasticsearchService
    ) {}

    search() {

    }

    // search() {
    //     return this.es.search<ExampleSchema>({
    //         index: 'pgds-new-development',
    //         query: {
    //             bool: {
    //                 must: [
    //                     { term: { field: {} } }
    //                 ]
    //             }
    //         },
    //         aggregations: {
    //             test: {
    //                 median_absolute_deviation: {
    //                     field: ''
    //                 }
    //             }
    //         }
    //     })
    //     .then(response => {
    //         response.hits.hits.map(record => {
    //             // eslint-disable-next-line no-underscore-dangle
    //             console.log(record._source)
    //         })
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })
    // }
}

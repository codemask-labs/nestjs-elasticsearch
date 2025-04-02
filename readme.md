# NestJS Elasticsearch Module

Welcome to Nestjs Elasticsearch module based on [@nestjs/elasticsearch](https://www.npmjs.com/package/@nestjs/elasticsearch) package.

The current version (2.x) is fully compatible with Elasticsearch 8. For projects using Elasticsearch 7, use the previous version (1.x).

### Motive

This package originates from our experience with using Elasticsearch in production environments, which leaded to maintenance issues when extensively used aggregations, searches and filters (especially aggregations).

The main issues we encountered and which our package fixes are:

1. Current Elasticsearch NestJS Module does not provide autocompletion for queries.
2. Elasticsearch response forgets about types of aggregations.
3. Since Elasticsearch indexes can be schema-less we got no proper feedback about what fields we should expect on the index.
4. Writing utility methods for all filters and aggregations queries caused a lot of boilerplate code in each project.

### Features

- :rocket: Quick Setup - Get up and running in minutes using our easy-to-understand API.

- :nerd_face: :computer: Developer Experience - Designed with developers in mind, package prioritizes ease of use and efficiency throughout the development process.

- :white_check_mark: Full TypeScript Support - Enjoy the benefits of code autocompletion and types for both request and response objects. ⁤⁤Unlike the original Elasticsearch library, this package provides full type definitions in order to provide better development experience and minimize runtime errors. ⁤

- :hammer_and_wrench: Utility Methods - Say goodbye to repetitive boilerplate code. The package offers set of utility methods for most common Elasticsearch filtering, sorting, pagination and aggregations use cases.

- :bookmark_tabs: Schema definitions - Schema definitions are integrated into the package, with each schema mapping to an Elasticsearch index to provide a clear data model. These definitions are used to register indexes in the module scope and inject them into a service, similar to the approach in the TypeORM NestJS module, ensuring that only fields available for a given index are used when building request objects.

### Installation

You can install package using yarn or npm:

```bash
$ yarn add @codemask-labs/nestjs-elasticsearch
```

```bash
$ npm i @codemask-labs/nestjs-elasticsearch
```

## Getting started

Once the package is installed, you can start with importing the `ElasticsearchModule` into the `AppModule`.

```typescript
import { ElasticsearchModule } from '@codemask-labs/nestjs-elasticsearch'

@Module({
    imports: [
        ElasticsearchModule.register({
            node: 'http://localhost:9200',
        }),
    ],
})
class AppModule {}
```

or

```typescript
import { ElasticsearchModule } from '@codemask-labs/nestjs-elasticsearch'

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useFactory: () => ({
                node: 'http://localhost:9200',
            })
        })
    ]
})
class AppModule {}
```

The `register()` and `registerAsync()` methods support all the configuration properties available in `ClientOptions` from the [@elastic/elasticsearch](https://www.npmjs.com/package/@elastic/elasticsearch) package.

### Registering the index

You can define index schema with `@RegisterIndex()` decorator.

```typescript
import { RegisterIndex } from '@codemask-labs/nestjs-elasticsearch'

@RegisterIndex('examples')
export class ExampleDocument {
    readonly id: string
    readonly exampleField: string
    readonly exampleNumericField: number
}
```

### Add index to a module

The `ElasticsearchModule` provides the `forFeature()` method to configure the module and define which indexes should be registered in the current scope.

```typescript
import { ElasticsearchModule } from '@codemask-labs/nestjs-elasticsearch'
import { ExampleDocument } from './example.document'

@Module({
    imports: [ElasticsearchModule.forFeature([ExampleDocument])],
    providers: [ExampleService],
})
export class ExampleModule {}
```

### Inject index in a service

With module configuration in place, we can inject the `ExampleDocument` into the `ExampleService` using the `@InjectIndex()` decorator:

```typescript
import { Injectable } from '@nestjs/common'
import { Index } from '@codemask-labs/nestjs-elasticsearch'
import { ExampleDocument } from './example.document'

@Injectable()
export class ExampleService {
    @InjectIndex(ExampleDocument)
    private readonly exampleIndex: Index<ExampleDocument>

    getExampleDocuments() {
        return this.exampleIndex.search()
    }
}
```

Now you can start creating request to Elasticsearch.

## Usage

Once you finish the Getting Started guide, you can start building Elasticsearch request objects.

You can put request object directly in the `search()` method

```typescript
import { getBoolQuery, getTermQuery, Order } from '@codemask-labs/nestjs-elasticsearch'

getExampleDocuments() {
    return this.exampleIndex.search({
        size: 10,
        query: getBoolQuery({
            must: [
                getTermQuery('exampleField.keyword', 'Some value'),
                getRangeQuery('exampleNumericField', {
                    gte: 1,
                    lte: 10
                })
            ]
        }),
        sort: {
            'exampleField.keyword': {
                order: Order.ASC
            }
        }
    })
}
```

or use `getSearchRequest()` method if you want to move request creation to some other place, but still laverage full type support and autocompletion.

```typescript
import { getBoolQuery, getTermQuery, getSearchRequest, Order } from '@codemask-labs/nestjs-elasticsearch'
import { ExampleDocument } from './example.document'

const searchRequestBody = getSearchRequest(ExampleDocument, {
    size: 10,
    query: getBoolQuery({
        must: [
            getTermQuery('exampleField.keyword', 'Some value'),
            getRangeQuery('exampleNumericField', {
                gte: 1,
                lte: 10,
            }),
        ],
    }),
    sort: {
        'exampleField.keyword': {
            order: Order.ASC,
        },
    },
})
```

## Queries

As for now the package provides utils for the following filter queries:

| Query DSL                        | Function Name                      | Documentation                                                                                                                         |
| :------------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Compound queries                 | `getBoolQuery()`                   | [Boolean query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)                            |
|                                  | `getMustQuery()`                   |                                                                                                                                       |
|                                  | `getMustNotQuery()`                |                                                                                                                                       |
|                                  | `getShouldQuery()`                 |                                                                                                                                       |
| Full text queries                | `getMatchQuery()`                  | [Match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html)                             |
|                                  | `getMatchPhrasePrefixQuery()`      | [Match phrase prefix query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html) |
| Term-level queries               | `getExistsQuery()`                 | [Exists query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html)                           |
|                                  | `getRangeQuery()`                  | [Range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)                             |
|                                  | `getTermQuery()`                   | [Term query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html)                               |
|                                  | `getTermsQuery()`                  | [Terms query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html)                             |
| `minimum_should_match` parameter | `getMinimumShouldMatchParameter()` | [minimum_should_match parameter](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html) |

## Aggregations

As for now the package provides utils for the following aggregation queries:

| Aggregations          | Function Name                    | Documentation                                                                                                                                                |
| :-------------------- | :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bucket Aggregations   | `getCompositeAggregation()`      | [Composite aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html)               |
|                       | `getDateHistogramAggregation()`  | [Date histogram aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html)      |
|                       | `getFilterAggregation()`         | [Filter aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html)                     |
|                       | `getHistogramAggregation()`      | [Histogram aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html)               |
|                       | `getMissingValueAggregation()`   | [Missing aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-missing-aggregation.html)                   |
|                       | `getRangeAggregation()`          | [Range aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html)                       |
|                       | `getTermsAggregation()`          | [Terms aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)                       |
| Metrics Aggregations  | `getAvgAggregation()`            | [Avg aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-avg-aggregation.html)                          |
|                       | `getCardinalityAggregation()`    | [Cardinality aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html)          |
|                       | `getGeoCentroidAggregation()`    | [Geo-centroid aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geocentroid-aggregation.html)         |
|                       | `getMaxAggregation()`            | [Max aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html)                          |
|                       | `getMinAggregation()`            | [Min aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-min-aggregation.html)                          |
|                       | `getPercentileAggregation()`     | [Percentiles aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-aggregation.html)           |
|                       | `getSumAggregation()`            | [Sum aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-sum-aggregation.html)                          |
|                       | `getTopHitsAggregation()`        | [Top hits aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html)                |
|                       | `getValueCountAggregation()`     | [Value count aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-valuecount-aggregation.html)           |
| Pipeline Aggregations | `getBucketScriptAggregation()`   | [Bucket script aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-script-aggregation.html)     |
|                       | `getBucketSelectorAggregation()` | [Bucket selector aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-selector-aggregation.html) |
|                       | `getBucketSortAggregation()`     | [Bucket sort aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-sort-aggregation.html)         |
|                       | `getStatsBucketAggregation()`    | [Stats bucket aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-stats-bucket-aggregation.html)       |

## License

MIT

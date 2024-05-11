# NestJS Elasticsearch Module


## Introduction

Welcome to Nestjs Elasticsearch module based on [@nestjs/elasticsearch](https://www.npmjs.com/package/@nestjs/elasticsearch) package.

### Motive
This package originates from our experience with using Elasticsearch in production environments, which leaded to maintenance issues when extensively used aggregations, searches and filters (especially aggregations).

The main issues we encountered and which our package fixes are:
1. Current Elasticsearch NestJS Module does not provide autocompletion for queries.
2. Elasticsearch response forgets about types of aggregations.
3. Since Elasticsearch indexes can be schema-less we got no proper feedback about what fields we should expect on the index.
4. Writing utility methods for all filters and aggregations queries caused a lot of boilerplate code in each project.

### Features

- Quick Setup: Get up and running in minutes using our easy-to-understand API.

- Developer Experience: Designed with developers in mind, package prioritizes ease of use and efficiency throughout the development process.

- Full TypeScript Support: Enjoy the benefits of code autocompletion and types for both request and response objects. ⁤⁤Unlike the original Elasticsearch library, this package provides full type definitions in order to provide better development experience and minimize runtime errors. ⁤

- Utility Methods: Say goodbye to repetitive boilerplate code. The package offers set of utility methods for most common Elasticsearch filtering, sorting, pagination and aggregations use cases.

- Schema definitions: Elasticsearch index itself may be schema-less, but we integrated schema definitions into our package. Each schema maps to an Elasticsearch index. This gives us clear data model, which can be used when building request object, ensuring only fields available for given index are used. These definitions are also used to register indexes in module scope and inject them into a service, similar to how it is approached in TypeORM NestJS module.


### Instalation
You can install package using yarn or npm

```bash
$ yarn add @codemask-labs/nestjs-elasticsearch
// or
$ npm -i @codemask-labs/nestjs-elasticsearch
```

## Getting started

Once the package is installed, you can start with importing the `ElasticsearchModule` into the `AppModule`.

```typescript
import { ElasticsearchModule } from '@codemask-labs/nestjs-elasticsearch'

@Module({
    imports: [
        ElasticsearchModule.register({
            node: 'http://localhost:9200'
        })
    ]
})
class AppModule {}
```

The `register()` method supports all the configuration properties available in `ClientOptions` from the [@elastic/elasticsearch](https://www.npmjs.com/package/@elastic/elasticsearch) package.

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
    providers: [ExampleService]
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


## Api Reference
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
import {
    getBoolQuery,
    getTermQuery,
    getSearchRequest,
    Order
} from '@codemask-labs/nestjs-elasticsearch'
import { ExampleDocument } from './example.document'

const searchRequestBody = getSearchRequest(ExampleDocument, {
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

### Filtering

As for now the package provides utils for the following filter queries:

#### Boolean query

Use `getBoolQuery()` for [Boolean query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
and its most common occurrence types:
- `getMustNotQuery()` for **Must not query**
- `getShouldQuery()` for **Should query**
- `getMustQuery()` for **Must query**

Together with that you can also use `getMinimumShouldMatchParameter()` for [minimum_should_match parameter](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html#bool-min-should-match)

#### Full text queries
- `getMatchPhrasePrefixQuery()` for [Match phrase prefix query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html)
- `getMatchQuery()` for [Match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html)

#### Term-level queries

- `getTermQuery()` for [Term query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html)
- `getTermsQuery()` for [Terms query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html)
- `getRangeQuery()` for [Range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)

### Aggregations

As for now the package provides utils for the following aggregation queries:

#### Bucket aggregations
- `getCompositeAggregation()` for [Composite aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html)
- `getDateHistogramAggregation()` for [Date histogram aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html)
- `getMissingValueAggregation()` for [Missing aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-missing-aggregation.html)
- `getHistogramAggregation()` [Histogram aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html)
- `getRangeAggregation()` for [Range aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html)
- `getTermsAggregation()` for [Terms aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)

#### Metrics aggregations:
- `getAvgAggregation()` for [Avg aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-avg-aggregation.html)
- `getCardinalityAggregation()` for [Cardinality aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html)
- `getMaxAggregation()` for [Max aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html)
- `getMinAggregation()` for [Min aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-min-aggregation.html)
- `getPercentileAggregation()` for [Percentiles aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-aggregation.html)
- `getSumAggregation()` for [Sum aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-sum-aggregation.html)
- `getTopHitsAggregation()` for [Top hits aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html)
- `getValueCountAggregation()` for [Value count aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-valuecount-aggregation.html)

#### Pipiline aggregations
- `getStatsBucketAggregation()` for [Stats bucket aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-stats-bucket-aggregation.html)


## License

MIT

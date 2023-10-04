import { Catalog } from '../decorators'

@Catalog('example-catalog-name')
export class ExampleDocument {
    // eslint-disable-next-line camelcase
    readonly field: string
}

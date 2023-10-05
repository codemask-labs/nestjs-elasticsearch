import { IsString } from 'class-validator'
import { Catalog } from 'nestjs/decorators'

@Catalog('example-catalog-name')
export class ExampleCatalogDocument {
    @IsString()
    readonly field: string
}

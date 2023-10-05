```typescript
import { IsString } from 'class-validator'
import { Catalog } from 'nestjs/decorators'

@Catalog('example-catalog-name')
export class ExampleDocument {
    @IsString()
    readonly field: string
}
```

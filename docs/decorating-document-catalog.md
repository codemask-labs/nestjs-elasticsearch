```typescript
import { IsString } from 'class-validator'
import { RegisterIndex } from '@codemaskjs/nestjs-elasticsearch'

@RegisterIndex('examples')
export class ExampleDocument {
    @IsString()
    readonly field: string
}
```

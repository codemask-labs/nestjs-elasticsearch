```typescript
import { Module } from '@nestjs/common'
import { ElasticsearchModule } from '../src/nestjs'
import { ExampleDocument } from './document'

@Module({
    imports: [
        ElasticsearchModule.register({
            node: 'http://localhost:9200',
            auth: {
                username: 'admin',
                password: 'password',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }),
        ElasticsearchModule.forFeature([ExampleDocument]),
    ],
})
export class AppModule {}
```

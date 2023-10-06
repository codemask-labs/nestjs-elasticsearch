import { Client } from '@elastic/elasticsearch'

const index = 'homes'
const client = new Client({
    node: 'http://localhost:9200'
})

import(`./seeds/homes.seed.json`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((data: any) => data.default)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((data: any) => data.flatMap((record: any) => [{ index: { _index: index } }, record]))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then(async (records: Array<any>) => {
        const { body: indexExists } = await client.indices.exists({ index })

        if (indexExists) {
            await client.indices.delete({ index })
        }

        await client.bulk({ body: records })

        console.log('Seeded `homes` with:', records.length, 'results.')
    })
    .catch(error => {
        throw new Error(`Failed to load homes seed: ${error.message}`)
    })

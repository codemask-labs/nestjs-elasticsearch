import { Client } from '@elastic/elasticsearch'
import { join } from 'path'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { readFile } from 'fs/promises'

const index = 'homes'
const client = new Client({
    node: TEST_ELASTICSEARCH_NODE
})

const path = join(__dirname, './seeds/homes.seed.json')

readFile(path)
    .then(buffer => buffer.toString())
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then(data => JSON.parse(data))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
    .then((data: any) => data.flatMap((record: any) => [{ index: { _index: index } }, record]))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then(async (records: Array<any>) => {
        const indexExists = await client.indices.exists({ index })

        if (indexExists) {
            await client.indices.delete({ index })
        }

        await client.indices.create({ index })

        await client.indices.putMapping({
            index,
            body: {
                properties: {
                    animals: {
                        type: 'nested'
                    },
                    location: {
                        type: 'geo_point'
                    }
                }
            }
        })

        await client.bulk({ body: records })

        // note: on line 17 index is added to each record, which means there are twice as many results - therefore the length is divided by 2
        console.log('\x1b[32m', `Seeded 'homes' index, with ${records.length / 2} records.`)
    })
    .catch(error => {
        throw new Error(`Failed to load homes seed: ${error.message}`)
    })

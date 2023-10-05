import { faker } from '@faker-js/faker'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ELASTICSEARCH_SEED_CATALOG_FILENAME = join(process.cwd(), 'src/test/seeds/homes.seed.json')
const DOCUMENTS_COUNT = 100

const data = new Array(DOCUMENTS_COUNT).fill(null).map(() => {
    const id = faker.string.uuid()
    const name = faker.person.fullName()
    const builtInYear = faker.number.int({ min: 1995, max: 2015 })
    const ownerEmail = faker.internet.email()
    const address = faker.location.streetAddress()
    const city = faker.location.city()

    const hasProperty = faker.number.int({ min: 0, max: 1 })
    const hasPropertyAreaSquared = faker.number.int({ min: 0, max: 1 })
    const areaSquared = faker.number.int({ min: 1, max: 1_000_000 })

    return {
        id,
        fullName: name,
        ownerEmail,
        address,
        city,
        hasProperty: hasProperty ? true : false,
        builtInYear: hasProperty ? builtInYear : null,
        propertyAreaSquared: hasProperty && hasPropertyAreaSquared ? areaSquared : null,
        propertyAreaSquaredAsString: hasProperty && hasPropertyAreaSquared ? areaSquared.toString() : null
    }
})

writeFileSync(ELASTICSEARCH_SEED_CATALOG_FILENAME, JSON.stringify(data, null, 4))

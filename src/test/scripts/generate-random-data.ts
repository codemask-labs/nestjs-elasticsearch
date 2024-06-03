import { faker } from '@faker-js/faker'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { HomeDocument, PropertyType } from 'test/module'

const ELASTICSEARCH_SEED_INDEX_FILENAME = join(process.cwd(), 'src/test/scripts/seeds/homes.seed.json')
const DOCUMENTS_COUNT = 100

const data = new Array(DOCUMENTS_COUNT).fill(null).map((): HomeDocument => {
    const id = faker.string.uuid()
    const name = faker.person.fullName()
    const builtInYear = faker.number.int({ min: 1995, max: 2015 })
    const ownerEmail = faker.internet.email()
    const address = faker.location.streetAddress()
    const city = faker.location.city()

    const hasProperty = faker.number.int({ min: 0, max: 1 })
    const hasPropertyAreaSquared = faker.number.int({ min: 0, max: 1 })
    const areaSquared = faker.number.int({ min: 1, max: 1_000_000 })
    const contractDate = faker.date.between({ from: '2023-01-01', to: '2023-12-31' }).toISOString()

    return {
        id,
        fullName: name,
        ownerEmail,
        address,
        city,
        hasProperty: hasProperty ? true : false,
        // eslint-disable-next-line @typescript-eslint/ban-types
        propertyType: hasProperty ? faker.helpers.arrayElement(Object.values(PropertyType)) : (null as unknown as undefined),
        // eslint-disable-next-line @typescript-eslint/ban-types
        builtInYear: hasProperty ? builtInYear : (null as unknown as undefined),
        // eslint-disable-next-line @typescript-eslint/ban-types
        propertyAreaSquared: hasProperty && hasPropertyAreaSquared ? areaSquared : (null as unknown as undefined),
        // eslint-disable-next-line @typescript-eslint/ban-types
        propertyAreaSquaredAsString: hasProperty && hasPropertyAreaSquared ? areaSquared.toString() : (null as unknown as undefined),
        // eslint-disable-next-line @typescript-eslint/ban-types
        contractDate: hasProperty ? contractDate : (null as unknown as undefined)
    }
})

writeFileSync(ELASTICSEARCH_SEED_INDEX_FILENAME, JSON.stringify(data, null, 4))

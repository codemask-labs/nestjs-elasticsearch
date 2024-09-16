import { faker } from '@faker-js/faker'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { HomeDocument, PropertyType } from 'test/module'

const DOCUMENTS_COUNT = 100
const ELASTICSEARCH_SEED_INDEX_FILENAME = join(process.cwd(), 'src/test/scripts/seeds/homes.seed.json')

const getAnimals = () => {
    const animals = new Array(faker.number.int({ max: 5 })).fill(undefined)

    return animals.map(() => ({
        id: faker.string.uuid(),
        type: faker.animal.type(),
        year: faker.number.int({ min: 1, max: 15 })
    }))
}

const data = new Array(DOCUMENTS_COUNT).fill(null).map((_, index): HomeDocument => {
    const id = faker.string.uuid()
    const name = faker.person.fullName()
    const builtInYear = faker.number.int({ min: 1995, max: 2015 })
    const ownerEmail = faker.internet.email()
    const address = index === 0 ? '36025 Church Walk' : faker.location.streetAddress() // note: to ensure that the seed has this address, needed for unit tests
    const city = faker.location.city()

    const hasProperty = faker.number.int({ min: 0, max: 1 })
    const hasPropertyAreaSquared = faker.number.int({ min: 0, max: 1 })
    const areaSquared = faker.number.int({ min: 1, max: 1_000_000 })
    const contractDate = faker.date.between({ from: '2023-01-01', to: '2023-12-31' }).toISOString()

    const latitude = faker.location.latitude()
    const longitude = faker.location.longitude()
    const location = `POINT (${longitude} ${latitude})`

    const animals = getAnimals()

    return {
        id,
        fullName: name,
        ownerEmail,
        address,
        city,
        hasProperty: Boolean(hasProperty),
        /* eslint-disable @typescript-eslint/no-restricted-types */
        propertyType: hasProperty ? faker.helpers.arrayElement(Object.values(PropertyType)) : (null as unknown as undefined),
        builtInYear: hasProperty ? builtInYear : (null as unknown as undefined),
        propertyAreaSquared: hasProperty && hasPropertyAreaSquared ? areaSquared : (null as unknown as undefined),
        propertyAreaSquaredAsString: hasProperty && hasPropertyAreaSquared ? areaSquared.toString() : (null as unknown as undefined),
        contractDate: hasProperty ? contractDate : (null as unknown as undefined),
        /* eslint-enable @typescript-eslint/no-restricted-types */
        location,
        animals
    }
})

writeFileSync(ELASTICSEARCH_SEED_INDEX_FILENAME, JSON.stringify(data, null, 4))

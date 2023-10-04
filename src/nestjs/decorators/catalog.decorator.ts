export const Catalog = (name: string) => <T>(constructor: new () => T): new () => T => {
    Reflect.defineMetadata('es:catalog:name', name, constructor)

    return constructor
}

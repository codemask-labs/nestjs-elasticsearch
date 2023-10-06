import { IsString, IsEnum, IsNumber, IsBoolean, IsOptional } from 'class-validator'
import { Catalog } from 'lib/decorators'
import { PropertyType } from './enums'

@Catalog('homes')
export class HomeDocument {
    @IsString()
    readonly id: string

    @IsString()
    readonly fullName: string

    @IsString()
    readonly ownerEmail: string

    @IsString()
    readonly address: string

    @IsString()
    readonly city: string

    @IsBoolean()
    readonly hasProperty: boolean

    @IsEnum(PropertyType)
    readonly propertyType: PropertyType

    @IsNumber()
    @IsOptional()
    readonly builtInYear?: number

    @IsString()
    @IsOptional()
    readonly propertyAreaSquared?: number

    @IsString()
    @IsOptional()
    readonly propertyAreaSquaredAsString?: number
}

import { IsString, IsEnum, IsNumber, IsBoolean, IsOptional, IsDate } from 'class-validator'
import { RegisterIndex } from 'lib/decorators'
import { PropertyType } from './enums'

@RegisterIndex('homes')
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
    @IsOptional()
    readonly propertyType?: PropertyType

    @IsNumber()
    @IsOptional()
    readonly builtInYear?: number

    @IsNumber()
    @IsOptional()
    readonly propertyAreaSquared?: number

    @IsString()
    @IsOptional()
    readonly propertyAreaSquaredAsString?: string

    @IsString()
    @IsOptional()
    readonly contractDate?: string
}

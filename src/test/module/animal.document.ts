import { IsNumber, IsString } from 'class-validator'

export class AnimalDocument {
    @IsString()
    readonly id: string

    @IsString()
    readonly type: string

    @IsNumber()
    readonly year: number
}

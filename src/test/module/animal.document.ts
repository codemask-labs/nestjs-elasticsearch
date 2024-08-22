import { IsString } from 'class-validator'

export class AnimalDocument {
    @IsString()
    readonly id: string

    @IsString()
    readonly type: string

    @IsString()
    readonly color: string
}

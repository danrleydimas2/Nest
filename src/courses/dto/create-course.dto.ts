import { IsString } from "class-validator"

export class CreateCourseDTO {
    @IsString()
    readonly name: string
    @IsString()
    readonly description: string
    @IsString({each:true}) //cada elemento do array tem que ser string
    readonly tags: string[]
}
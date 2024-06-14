import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNoteDto {

    @IsOptional()
    @IsString()
    id: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    user: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    tag: string;

}

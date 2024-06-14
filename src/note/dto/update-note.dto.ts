import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNoteDto {

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


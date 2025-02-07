import { IsNotEmpty, IsNumber, IsString, MaxLength, IsNumberString, IsOptional } from "class-validator";
export class GetTemparatureDto {

    @IsNotEmpty()
    token: string;

}

export class AddTemperatureDto {

    @IsNotEmpty()
    @IsNumberString()
    temperature: number;
    
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    feel: string;

    @IsNotEmpty()
    @IsNumberString()
    latitude: number;

    @IsNotEmpty()
    @IsNumberString()
    langitude: number;

    @IsOptional()
    area: string

    @IsOptional()
    status: number

    @IsNotEmpty()
    @IsNumberString()
    created_at: Date;

}
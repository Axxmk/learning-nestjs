import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsInt, IsOptional, MaxLength } from "class-validator";

export class CreateUserDto {
	@ApiProperty()
	@IsAlphanumeric()
	@MaxLength(10, { message: 'Name is too long. Maximum length is $constraint1, but actual is $value' })
	name: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsInt()
	age?: number;
}
import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
	name?: string;
	breed?: string;
	owner?: User;
}

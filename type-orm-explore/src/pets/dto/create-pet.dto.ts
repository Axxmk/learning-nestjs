import { User } from "src/users/entities/user.entity";

export class CreatePetDto {
	name: string;
	breed: string;
	owner: User;
}

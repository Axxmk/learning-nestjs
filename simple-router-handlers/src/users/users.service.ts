import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
	private users: User[] = [
		{
			id: 1,
			name: 'Ann',
			age: 20,
		},
		{
			id: 2,
			name: 'Parntip',
			age: 19,
		},
		{
			id: 3,
			name: 'May',
		},
	];

	// get multiple users (can provide specific name)
	findAll(name?: string): User[] {
		if (name) {
			return this.users.filter(user => user.name === name);
		}
		return this.users;
	}

	// get the user by id
	findById(userId: number): User {
		return this.users.find(user => user.id === userId);
	}

	// add new user to users collection
	createUser(createUserDto: CreateUserDto): User {
		const newUser = { id: Date.now(), ...createUserDto };

		this.users.push(newUser);

		return newUser;
	}

	// remove a user from the lists
	removeUser(id: number): string {
		this.users = this.users.filter(user => user.id !== id);
		return `Remove user #${id} successfully`;
	}
}

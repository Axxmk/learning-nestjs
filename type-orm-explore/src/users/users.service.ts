import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

	getAll(): Promise<User[]> {
		return this.usersRepository.find();	   // SELECT * FROM users
	}

	async getOneById(id: number): Promise<User> {
		try {
			const user = await this.usersRepository.findOneOrFail(id);	 // SELECT * FROM users WHERE users.id = id
			return user;
		}
		catch (err) {
			// handle an error
			throw err;
		}
	}

	createUser(firstName: string, lastName: string): Promise<User> {
		const newUser = this.usersRepository.create({ firstName, lastName });	 // const newUser = new User();
		return this.usersRepository.save(newUser);	 // INSERT
	}

	async updateUser(id: number, firstName?: string, lastName?: string): Promise<User> {
		const user = await this.getOneById(id);

		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;

		return this.usersRepository.save(user);	 // UPDATE
	}

	async deleteUser(id: number): Promise<User> {
		const user = await this.getOneById(id);
		return this.usersRepository.remove(user);
	}
}

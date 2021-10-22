import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) { }

	getAll(): Promise<User[]> {
		return this.usersRepository.find({ relations: ['pets'] });	   // SELECT * FROM users JOIN pets
	}

	async getOneById(id: number): Promise<User> {
		try {
			const user = await this.usersRepository.findOneOrFail(id, { relations: ['pets'] });	 // SELECT * FROM users WHERE users.id = id
			return user;
		}
		catch (err) {
			// handle an error
			throw new NotFoundException(err.message);
		}
	}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		try {
			const newUser = this.usersRepository.create({ ...createUserDto });	 // const newUser = new User();
			return await this.usersRepository.save(newUser); 	// INSERT
		}
		catch (err) {
			// handle an error
			throw new BadRequestException(err.message);
		}
	}

	async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.getOneById(id);

		if (updateUserDto.firstName) user.firstName = updateUserDto.firstName;
		if (updateUserDto.lastName) user.lastName = updateUserDto.lastName;

		return this.usersRepository.save(user);	 // UPDATE
	}

	async deleteUser(id: number): Promise<User> {
		const user = await this.getOneById(id);

		return this.usersRepository.remove(user); // DELETE FROM users WHERE users.id = id
	}
}

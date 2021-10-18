import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) { }

	// Fetch multiple users (with specific name if provided)
	@ApiOkResponse({ type: User, isArray: true, description: 'All users' })
	@ApiQuery({ name: 'name', required: false })
	@ApiNotFoundResponse()
	@Get()
	getUsers(@Query('name') name: string): User[] {
		const users = this.userService.findAll(name);

		if (users.length === 0) throw new NotFoundException(`No users name ${name}`);

		return users;
	}

	// Fetch a single user by id
	@ApiOkResponse({ type: User, description: 'A single user' })
	@ApiNotFoundResponse()
	@Get(':id')
	getUserById(@Param('id', ParseIntPipe) id: number): User {
		const user = this.userService.findById(id);

		if (!user) throw new NotFoundException(`No user id ${id}`);

		return user;
	}

	// Create a new user
	@ApiCreatedResponse({ type: User })
	@ApiBadRequestResponse()
	@Post()
	createUser(@Body() createUserDto: CreateUserDto): User {
		const allowedProperties = ['name', 'age'];
		const properties = Object.keys(createUserDto);
		const isAllowed = properties.every(prop => allowedProperties.includes(prop));

		if (!isAllowed) throw new BadRequestException('Contain not allowed property');

		return this.userService.createUser(createUserDto);
	}

	@ApiNotFoundResponse()
	@Delete(':id')
	deleteUser(@Param('id', ParseIntPipe) id: number): string {
		const user = this.userService.findById(id);

		if (!user) throw new NotFoundException(`No user id ${id}`);

		return this.userService.removeUser(id);
	}
}

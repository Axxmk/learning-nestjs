import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ContactInfo } from './entities/contact-info.entity';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
	constructor(
		@InjectRepository(Employee) private employeeRepo: Repository<Employee>,
		@InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>
	) { }

	create(createEmployee: CreateEmployeeDto) {
		return 'This action adds a new employee';
	}

	findAll() {
		return `This action returns all employees`;
	}

	findOne(id: number) {
		return `This action returns a #${id} employee`;
	}

	update(id: number, updateEmployee: UpdateEmployeeDto) {
		return `This action updates a #${id} employee`;
	}

	remove(id: number) {
		return `This action removes a #${id} employee`;
	}
}

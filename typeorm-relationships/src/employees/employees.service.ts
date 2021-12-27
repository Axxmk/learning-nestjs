import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
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

	async createEmployee(createEmployee: CreateEmployeeDto): Promise<Employee> {
		try {
			const employee = this.employeeRepo.create({ ...createEmployee });
			return await this.employeeRepo.save(employee);
		}
		catch (err) {
			// throw error to controller
			throw new Error();
		}
	}

	async findAll(): Promise<Employee[]> {
		return await this.employeeRepo.find();
	}

	async findOneById(id: number): Promise<Employee> {
		try {
			const employee = await this.employeeRepo.findOneOrFail(id);
			return employee;
		}
		catch (err) {
			// throw error to controller
			throw new Error();
		}
	}

	update(id: number, updateEmployee: UpdateEmployeeDto) {
		return `This action updates a #${id} employee`;
	}

	remove(id: number) {
		return `This action removes a #${id} employee`;
	}


	//* Contact-info methods

	async createContactInfo(createContactInfoDto: CreateContactInfoDto) {
		try {
			const contact = this.contactInfoRepo.create({ ...createContactInfoDto });
			return await this.contactInfoRepo.save(contact);
		}
		catch (err) {
			// throw error to controller
			throw new Error();
		}
	}
}
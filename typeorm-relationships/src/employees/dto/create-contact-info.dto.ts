import { Employee } from "../entities/employee.entity";

export class CreateContactInfoDto {
	phone: string;
	email: string;
	employee: Employee;
}
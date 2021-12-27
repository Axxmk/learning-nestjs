import { Employee } from "../entities/employee.entity";

export class CreateEmployeeDto {
	name: string;
	salary: number;
	manager: Employee;
}
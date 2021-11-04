import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: "50" })
	title: string;

	@Column()
	content: string;

	@ManyToOne(() => Employee, employee => employee.tasks, { onDelete: 'SET NULL' })
	employee: Employee;
}

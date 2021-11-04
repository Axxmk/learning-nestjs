import { Meeting } from "src/meetings/entities/meeting.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "./contact-info.entity";

@Entity()
export class Employee {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: "100" })
	name: string;

	@Column({ precision: 2 })
	salary: number;

	@ManyToOne(() => Employee, employee => employee.directReports, { onDelete: 'SET NULL' })  // direct reports' view
	manager: Employee;

	@OneToMany(() => Employee, employee => employee.manager)  // manager's view
	directReports: Employee[];

	@OneToOne(() => ContactInfo, contact => contact.employee)
	contactInfo: ContactInfo;

	@OneToMany(() => Task, task => task.employee)
	tasks: Task[];

	@ManyToMany(() => Meeting, meeting => meeting.attendees)
	@JoinTable()
	meetings: Meeting[];
}
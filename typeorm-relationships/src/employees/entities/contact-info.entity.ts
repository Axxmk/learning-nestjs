import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class ContactInfo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true, length: "10" })
	phone: string;

	@Column({ unique: true })
	email: string;

	@OneToOne(() => Employee, employee => employee.contactInfo, { onDelete: 'CASCADE' })
	@JoinColumn()
	employee: Employee;
}
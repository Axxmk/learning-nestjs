import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pet {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	breed: string;

	@ManyToOne(type => User, user => user.pets)
	owner: User;
}

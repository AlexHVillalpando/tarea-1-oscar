import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
	})
	email: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	password: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
	})
	role: string;

	@Column('boolean', {
		default: true,
	})
	status: boolean;
}

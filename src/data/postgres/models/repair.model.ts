import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Repair extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('date', {
		nullable: false,
	})
	date: Date;

	@Column('varchar', {
		length: 15,
		nullable: false,
	})
	status: string;

	// @PrimaryGeneratedColumn('uuid')
	// userId: string
}

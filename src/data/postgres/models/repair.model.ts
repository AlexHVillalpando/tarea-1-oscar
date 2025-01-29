import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

export enum RepairStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
}
@Entity()
export class Repair extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('date', {
		nullable: false,
	})
	date: Date;

	@Column('enum', {
		enum: RepairStatus,
		default: RepairStatus.PENDING,
	})
	status: RepairStatus;

	@ManyToOne(() => User, (user) => user.repairs)
	@JoinColumn({ name: 'booked_by' })
	user: User;
}

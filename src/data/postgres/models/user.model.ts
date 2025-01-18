import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { encryptAdapter } from '../../../config/bcrypt.adapter';

export enum UserStatus {
	AVAILABLE = 'AVAILABLE',
	DISABLED = 'DISABLED',
}

export enum UserRole {
	EMPLOYEE = 'EMPLOYEE',
	CLIENT = 'CLIENT',
}
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
		unique: true,
	})
	email: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	password: string;

	@Column('enum', {
		enum: UserRole,
		default: UserRole.CLIENT,
	})
	role: UserRole;

	@Column('enum', {
		enum: UserStatus,
		default: UserStatus.AVAILABLE,
	})
	status: UserStatus;

	@BeforeInsert()
	encryptedPassword() {
		this.password = encryptAdapter.hash(this.password);
	}
}

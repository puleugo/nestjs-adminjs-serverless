import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@Entity({ name: 'your_entity' })
export class YourEntity extends BaseEntity {
	@PrimaryColumn({ name: 'ID' })
	id: string;

	@Column({ name: 'NAME' })
	name: string;

	@Column({ name: 'DELETED' })
	deleted: boolean = false;
}

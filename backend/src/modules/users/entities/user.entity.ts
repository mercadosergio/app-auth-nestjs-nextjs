import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "src/modules/roles/entities/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', unique: true })
    username: string;

    @Column({ type: 'varchar', length: 1000, select: false })
    password: string;

    @Column({ type: 'varchar', length: 1000 })
    biography: string;

    @Column({ type: 'varchar', length: 20 })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 1 })
    gender: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;
}

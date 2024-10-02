import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Blog } from "./blog.entity";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @CreateDateColumn()
  created_at: Date;
}

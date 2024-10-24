import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @Column()
  content: string;

  @Column("varchar", { array: true })
  tags: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

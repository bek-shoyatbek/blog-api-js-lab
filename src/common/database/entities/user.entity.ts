import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

  
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
  

  
    @CreateDateColumn()
    created_at: Date;
  }
  
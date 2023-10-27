import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Board extends BaseEntity{
  // 기본키라는 의미임
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  title:string

  @Column()
  description : string

  @Column()
  status : string

  @ManyToOne(type=>User, user=>user.boards, {eager:false})
  user:User

}
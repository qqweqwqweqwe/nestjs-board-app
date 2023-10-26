import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}
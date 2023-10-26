import { IsString, Matches, MaxLength, MinLength, minLength } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  
  @IsString() // 문자열인지
  @MinLength(4) // 최소글자 4
  @MaxLength(20) // 최대글자 20
  @Column()
  username : string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // 영어랑 숫자만 가능하게 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/,{
    message : 'password only accept english or number' 
  }
  )
  @Column()
  password : string;
}
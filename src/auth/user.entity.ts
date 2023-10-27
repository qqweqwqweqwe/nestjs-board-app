import { IsString, Matches, MaxLength, MinLength, minLength } from "class-validator";
import { type } from "os";
import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@unique(['username']) // username이  unique해질수 있도록 하는 대코레이션
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

  // 유저와 게시글의 관계는 1:n관계, 하나의 유저는 게시글이 여러개므로
  @OneToMany(type=>Board, board=>board.user,{eager : true}) // eager true는 유저를 가져올때 게시물도 같이 가져오게끔
  boards : Board[]
}

function unique(arg0: string[]): (target: typeof User) => void | typeof User {
  throw new Error("Function not implemented.");
}

import { IsNotEmpty } from "class-validator"

export class CreateBoardDto{
  @ IsNotEmpty() // 유효성 검사, 비어있지 않게끔
  title:string
  @IsNotEmpty() // 유효성 검사, 비어있지 않게끔
  description:string

}
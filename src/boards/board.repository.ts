import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board.status.enum";
import { User } from "src/auth/user.entity";


@EntityRepository(Board)  //board 엔티티를 관리하기 위한 리포지토리 클래스를 정의하는 데코레이터
export class BoardRepository extends Repository<Board>{  // 보드 엔티티를 관리하기 위한 메서드를 상속받음
  async createBoard(createBoardDto : CreateBoardDto, user:User):Promise<Board>{
    const {title, description}= createBoardDto;
  const board =this.create({ // 보드에 내용 추가하고
    title,
    description,
    status : BoardStatus.PUBLIC,
    user
  })
  await this.save(board)  // 레포에 보드 저장
  return board
  }
}

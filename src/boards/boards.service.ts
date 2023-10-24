import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid' // uuid의 v1버전을 uuid라는 이름으로 사용하게끔

@Injectable()  // 이 데코레이션을 사용함으로써 다른곳에서 보드서비스 접근 가능, 즉 어플리케이션 전체에서 사용 가능 
export class BoardsService {

  private boards: Board[]=[] 
  // private으로 하는 이유는 다른 곳에서 접근하지 못하게 하기 위해서 
  // 뒤에 Bord[] 가 의미하는 것은 저 배열이 Board배열임을 명시해주기 위함임
  

  // 모든 게시물들 가져오는 함수
  getAllboards() : Board[] { // 여기의 Board[]는 return 값이 Board[]라는 의미임
    return this.boards;
  }

  createBoard(title :string, description :string){
      const board={
        id : uuid(),  // 이제는 유니크한 값을 아이디로 줄 수 있음
        title :title,
        description : description,
        status:BoardStatus.PUBLIC
      }
    this.boards.push(board) // 새로운 게시물을 넣어줌
    return board;
  }
}

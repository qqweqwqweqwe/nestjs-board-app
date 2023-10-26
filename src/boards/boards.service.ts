import { Injectable, NotFoundException } from '@nestjs/common';
import {v1 as uuid} from 'uuid' // uuid의 v1버전을 uuid라는 이름으로 사용하게끔
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';

@Injectable()  // 이 데코레이션을 사용함으로써 다른곳에서 보드서비스 접근 가능, 즉 어플리케이션 전체에서 사용 가능 
export class BoardsService {

  constructor(
    // 이제부터 서비스 안에서 board repository 사용 가능
    @InjectRepository(BoardRepository)
    private boardRepository : BoardRepository,

  ){}
  // private boards: Board[]=[] 
  // // private으로 하는 이유는 다른 곳에서 접근하지 못하게 하기 위해서 
  // // 뒤에 Bord[] 가 의미하는 것은 저 배열이 Board배열임을 명시해주기 위함임
  

  // // 모든 게시물들 가져오는 함수
  // getAllboards() : Board[] { // 여기의 Board[]는 return 값이 Board[]라는 의미임
  //   return this.boards;
  // }
async createBoard(createBoardDto : CreateBoardDto): Promise<Board>{  // async의 return값은 프로미즈(복습한내용)
  return this.boardRepository.createBoard(createBoardDto)
}
  // createBoard(createBoardDto : CreateBoardDto){
  //   // const title  = createBoardDto.title
  //   // const description = createBoardDto.description

  //   //근데 위랑 아래랑 같다 아래가 더 편하니까 아래처럼 ㄱ
  //   const {title,description} = createBoardDto
  //     const board={
  //       id : uuid(),  // 이제는 유니크한 값을 아이디로 줄 수 있음
  //       title :title,
  //       description : description,
  //       status:BoardStatus.PUBLIC
  //     }
  //   this.boards.push(board) // 새로운 게시물을 넣어줌
  //   return board;
  // }
 
  async getBoardById(id:number):Promise <Board>{
    const found = await this.boardRepository.findOne(id)
    
    if(!found){
      throw new NotFoundException(`can't find Board With id ${id}`)
    }

    return found

  } 

  // // 서비스를 먼저 구현한 후 컨트롤러로 옮기는것
  
  // getBoardById(id :string):Board{
  //   // boards안에서 보드의 id와 매개변수 id가 같은 보드를 찾는것 
  //   const found =this.boards.find((board) => board.id===id); 


  //   if (!found){ // 만약에 없다면 예외 throw
  //     throw new NotFoundException(`Can't find board witg id ${id} `); // 오류 메세지 출력
  //   }

  //   return found 

  // }

  // deleteBoard(id: string):void{
  //   // id가 다른 게시물만 남겨준다는 의미임

  //   // 이렇게 해주면 없을때 알아서 에러 던졎ㅁ
  //   const found = this.getBoardById(id)

  //   this.boards = this.boards.filter((board)=> board.id!==found.id)
  // }

  // updateBoardStatus(id :string, status:BoardStatus):Board{
  //   const board = this.getBoardById(id)
  //   board.status = status;
  //   return board
  // }
}

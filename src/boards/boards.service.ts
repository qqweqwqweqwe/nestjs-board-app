import { Injectable, NotFoundException } from '@nestjs/common';
import {v1 as uuid} from 'uuid' // uuid의 v1버전을 uuid라는 이름으로 사용하게끔
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { User } from 'src/auth/user.entity';
import { use } from 'passport';

@Injectable()  // 이 데코레이션을 사용함으로써 다른곳에서 보드서비스 접근 가능, 즉 어플리케이션 전체에서 사용 가능 
export class BoardsService {

  constructor(
    // 이제부터 서비스 안에서 board repository 사용 가능
    // 리포지토리 의존성 주입
    @InjectRepository(BoardRepository)
    private boardRepository : BoardRepository,

  ){}
  // private boards: Board[]=[] 
  // // private으로 하는 이유는 다른 곳에서 접근하지 못하게 하기 위해서 
  // // 뒤에 Bord[] 가 의미하는 것은 저 배열이 Board배열임을 명시해주기 위함임
  

  async getAllBoards(
    user:User
  ) : Promise<Board[]>{
    // 보드 테이블에 대해서 쿼리 작성할 기반을 만드는 것
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', {userId:user.id}) // 게시글작성자가 유저 아이디랑 같은지

    const boards =await query.getMany() // getmany는 다 가져오는거


    return boards
  }


  async createBoard(createBoardDto : CreateBoardDto, user:User): Promise<Board>{  // async의 return값은 프로미즈(복습한내용)
  return this.boardRepository.createBoard(createBoardDto,user)
}
 
  async getBoardById(id:number):Promise <Board>{
    const found = await this.boardRepository.findOne(id) // 주어진 id에 해당하는 데이터 검색
    if(!found){
      throw new NotFoundException(`can't find Board With id ${id}`)
    }
    return found
  } 

  // 서비스를 먼저 구현한 후 컨트롤러로 옮기는것
  

  async deleteBoard(id :number, user:User ) :Promise<void>{
    const result =await this.boardRepository.delete({id,user}) //  db에서 id값의 게시물을 삭제해줌, 없으면 아무일도 일어나지 않음
    
    if (result.affected===0){ // 영향을 준것이 0이라는 것은 해당 게시글이 없다는 소리, 즉 에러 throw
      throw new NotFoundException(`can't find board with id ${id}`)
    }
    
  }

  async updateBoardStatus(id :number, status:BoardStatus):Promise<Board>{
    const board = await this.getBoardById(id)


    board.status=status
    await this.boardRepository.save(board)
    // save 메서드는 해당 id가 있으면 게시물을 업데이트한다.
    // 즉 save를 한번 더 호출한다고 상태가 다른 같은 게시물 두개가
    // 저장되는것이 아니다.
    
    return board
  }
}

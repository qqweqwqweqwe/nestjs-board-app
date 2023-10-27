import { Body, Controller,Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe,Delete, Patch, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.status.enum';
import { BoardStatusvalidationPipe } from './pipes/board-status-validation.pipes';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')  // /boards로 시작하는 get요청을 처리
@UseGuards(AuthGuard()) // 컨트롤러 레벨로 주면 밑에있는 핸들러들 전부 영향 , 이제 토큰 없으면 게시판 활용 ㄴㄴ
export class BoardsController {

  constructor (private boardService : BoardsService){}  // 프로바이더 보드 서비스의 의존성 주입
  
  @Get()
  getAllBoard(
    @Getuser() user:User // 현재 요청의 사용자 정보를 나타내는 것으로 가정
  ) : Promise <Board[]>{
  return this.boardService.getAllBoards(user)
  }

  @Post()
  @UsePipes(ValidationPipe) // 요청 데이터의 유효성을 검사하기 위한 파이프
  // 보드dto에 대한 유효성 검사를 대신 해줌
  createBoard(@Body() CreateBoardDto : CreateBoardDto,
  // @body태그는 요청의 본문에 있는 데이터를 추출 
  // 해당 본문의 json데이터에 CreateBoardDto에 해당하는 값을 CreateBoardDto에 할당
    @Getuser() user:User ) : Promise<Board>{ // 이제 게시글 작성할때 유저 정보까지 같이 넘겨줄거임
    return this.boardService.createBoard(CreateBoardDto,user)
  }

  @Get("/:id")
    // // param과 body의 차이는 param은 주소에 포함된 변수를 담고, body는 json등에 포함된 변수를 담는다
    // ('id')는 해당 매개변수의 이름을 나타내며 이 경우 url경로의 "id" 부분과 매핑
    // 즉 id에는 url 경로의 "id"값이 매핑됨, number로
    getBoardById(@Param('id') id :number) :Promise<Board>{
    return this.boardService.getBoardById(id)
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id,
  @Getuser() user:User // 유저 정보 가져오기
  // 자신이 생성한 게시물을 삭제
  ) : Promise<void> { 
    return this.boardService.deleteBoard(id,user) 
  }

  // // param과 body의 차이는 param은 주소에 포함된 변수를 담고, body는 json등에 포함된 변수를 담는다
  @Patch('/:id/status') // 해당 id글의 상태 변환
  updateBoardStatus(
    @Param('id',ParseIntPipe) id:number, // 파이프 추가
    @Body('status', BoardStatusvalidationPipe) status:BoardStatus  // status만 유효성 검사 해주는 것임
  ){
    return this.boardService.updateBoardStatus(id,status)
  }
}
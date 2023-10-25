import { Body, Controller,Get, Post,Param, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusvalidationPipe } from './pipes/board-status-validation.pipes';

@Controller('boards')
export class BoardsController {
  // boardService : BoardsService
  
  // constructor(boardService : BoardsService){
  //   this.boardService=boardService;
  // }
  // 위 방식처럼 해도 되지만 이렇게 해도됨, 보드서비스 주입
  constructor(private boardService : BoardsService){}
  @Get()
  getAllBoard() : Board[]{
  return this.boardService.getAllboards()
  }

  @Post()
  @UsePipes(ValidationPipe) // 유효성 검사 파이프 추가 (데코레이션 레벨)
  creaateBoard(
    @Body() createBoardDto : CreateBoardDto
    )
    :Board      {
    return this.boardService.createBoard(createBoardDto)
  }


  @Get("/:id")
  // 위에 "/:id"니까 id로 가져오면 됨
  getBoardById(@Param('id') id :string){
    return this.boardService.getBoardById(id)
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id :string){
    this.boardService.deleteBoard(id)
  }

  // param과 body의 차이는 param은 주소에 포함된 변수를 담고, body는 json등에 포함된 변수를 담는다
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id:string,
    @Body('status', BoardStatusvalidationPipe) status:BoardStatus  // status만 유효성 검사 해주는 것임

  ){
    return this.boardService.updateBoardStatus(id,status)
  }
  
}

import { Controller,Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';

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
}

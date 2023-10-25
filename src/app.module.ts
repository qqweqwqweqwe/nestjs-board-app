import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { BoardRepository } from './boards/board.repository';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),  
  ],
  controllers : [BoardsController],
  providers : [BoardsService]

})
export class AppModule {}

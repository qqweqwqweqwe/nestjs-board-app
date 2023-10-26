import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserRepository]) //  유저 리포지토리를 다른곳에서도
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({
      secret:'Secret1234', // 더해주는 시크릿 텍스트
      signOptions:{
        expiresIn : 60*60 // 토큰을 어느정도 유효하게 해줄건지 (1시간)
      }
    }),
    TypeOrmModule.forFeature([UserRepository]) //  유저 리포지토리를 다른곳에서도 사용할 수 있게끔
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy,PassportModule] // 다른 모듈에서 사용해주기 위해서 넣어주는것 
})
export class AuthModule {}

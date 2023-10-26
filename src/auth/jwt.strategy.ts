import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable() // 다른곳에서도 주입될 수 있도록
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserRepository)
    private userRepository :UserRepository

  ){
    super({ // 부모컴포넌트를 사용하기 위해 선언하는것 
      secretOrKey : 'Secret1234',  //시크릿코드는 토큰을 선언할때 썻던거랑 같은걸 써야함
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken() // 토큰이 유효한지 확인
    }) 
  }
  async validate(payload) {    // 토큰이 유효한지 확인이 도ㅒㅆ으면 실행된느 함수

    const {username} = payload
    const user :User = await this.userRepository.findOne({username})  // 리포지토리에 유저네임이 들어있는지
    if(!user){
      throw new UnauthorizedException();
    }

    return user
  }
}
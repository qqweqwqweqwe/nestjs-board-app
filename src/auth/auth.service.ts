import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from'bcryptjs'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository) // 서비스에서 리포지토리 사용하기 위해 인젝션
    private userRepository  : UserRepository, // 리포지토리 의존성 추가
    private jwtService : JwtService  // jwt서비스 의존성 추가
  ){}

  // 회원가입
  async signUp(authCredentialDto:AuthCredentialDto) : Promise<void>{
    return this.userRepository.createUser(authCredentialDto)
  }

  //로그인
  async signIn(authCredentialDto:AuthCredentialDto) :Promise<{accessToken : string}>{
    const {username, password} = authCredentialDto

    const user =await this.userRepository.findOne({username})

    if(user && (await bcrypt.compare(password, user.password))){ // 유저아이디가 있고, 그 유저의 비밀번호와 같으면{
      // 여기서 바로 로그인 성공으로 가는게 아니라 유저 토큰 생성해주어야함
      // (secret +payload)
      const payload ={ username }
      const accessToken= await this.jwtService.sign(payload) // jwt제공 메소드에서 토큰 생성 
      
      return {accessToken}


    }
    else{
      throw new UnauthorizedException('login failed')
    }
  }
}

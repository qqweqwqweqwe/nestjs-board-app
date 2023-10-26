import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService){} // authservice 의존성 주입


  // 회원가입 기능
  @Post('/signup')
  // validationpipe는 유효성 조건에 맞는지 체크해주기 위해
  signUp(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto) : Promise<void>{
    return this.authService.signUp(authCredentialDto)
  }

  @Post('/signIn')
  signIn(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto) : Promise<{accessToken : string}>{
    return this.authService.signIn(authCredentialDto)
  }

  @Post('/test')    // 이거 실행해서 확인하면 user객체를 확인할 수 없음

  @UseGuards(AuthGuard()) // 근데 이젠 확인할 수 있음
  test(@Req() req){
    console.log('req', req)
    // 이떄 사용하는 것이 useguards--> 인증 미들웨어라고 보면됨
    // 우리가 pipe를 유효성 검사하는 미들웨어로 썻듯이 ㅇㅇ
  }
}

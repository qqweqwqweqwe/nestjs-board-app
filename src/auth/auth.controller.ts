import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService){} // authservice 의존성 주입


  // 회원가입 기능
  @Post('/signup')
  // validationpipe는 유효성 조건에 맞는지 체크해주기 위해
  signUp(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto) : Promise<void>{
    return this.authService.signUp(authCredentialDto)
  }
}

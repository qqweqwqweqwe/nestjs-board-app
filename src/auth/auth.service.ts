import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository) // 서비스에서 리포지토리 사용하기 위해 인젝션
    private userRepository  : UserRepository
  ){}

  async signUp(authCredentialDto:AuthCredentialDto) : Promise<void>{
    return this.userRepository.createUser(authCredentialDto)
  }
}

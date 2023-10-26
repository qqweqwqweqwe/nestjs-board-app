import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { promises } from "dns";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from'bcryptjs'


@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async createUser(authCredentialDto : AuthCredentialDto):Promise<void>{
    const {username,password} = authCredentialDto

    const salt =await bcrypt.genSalt() // 패스워드에 뿌릴 소금 생성
    const hashedPassword = await bcrypt.hash(password,salt) // 패스워드에 소금 뿌리고 반환

    const user = this.create({username, password : hashedPassword}) // 패스워드에 hashed된 패스워드 삽입
    

    // 실행하고 에러 발생시 에러 출력
    try{
      await this.save(user)
    }
    catch(error){
      if (error.code === '23505'){ //에러코드가 23505일시
        // 동일 이름 존재 에러
        throw new ConflictException('exsiting name')
      }
      else{
        throw new InternalServerErrorException()
      }
      
    }


    await this.save(user)
  }
}
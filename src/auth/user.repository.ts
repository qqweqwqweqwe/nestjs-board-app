import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { promises } from "dns";


@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async createUser(authCredentialDto : AuthCredentialDto):Promise<void>{
    const {username,password} = authCredentialDto
    const user = this.create({username,password})

    await this.save(user)
  }
}
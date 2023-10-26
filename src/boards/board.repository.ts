import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{
  // @EntityRepository 가 deprecated 됐기 때문에 이렇게 해주어야함
  // 이것이 board를 위한 repository임을 알려주는 코드}


}

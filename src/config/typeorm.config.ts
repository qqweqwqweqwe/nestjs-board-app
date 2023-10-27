import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username : 'postgres',
  password : 'dd',
  database : 'board-app',
  entities : [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize :true
}
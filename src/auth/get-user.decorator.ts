// 커스텀 데코레이터

import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

export const Getuser= createParamDecorator((data,ctx:ExecutionContext): User=>{
  const req =  ctx.switchToHttp().getRequest()
  return req.user 
})
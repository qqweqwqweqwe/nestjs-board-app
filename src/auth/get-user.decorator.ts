// 커스텀 데코레이터

import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

// Getuser 라는 커스텀 데코레이터를 생성하는 것
export const Getuser= createParamDecorator((data,ctx:ExecutionContext): User=>{
  // http 요청에서 user 객체를 추출하고 이를 nestjs 컨트롤러에서 쉽게 사용할 수 있게함.
  // 이 데코레이터를 쓰면 사용자 객체에 쉽게 엑세스 할 수 있음
  const req =  ctx.switchToHttp().getRequest()
  return req.user 
})
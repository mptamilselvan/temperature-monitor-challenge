import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class CanAccess {
  private module;
  private permission;
  constructor(module: string, permission: string) {
    this.module = module;
    this.permission = permission;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //const user = request.token; 
    
      //console.log(request.query.token);
      const token = request.query.token;
      console.log('token',token);
      console.log('env', process.env.TOKEN);

      if(!token || token!=process.env.TOKEN) {
        return false;
      }

      return true;
        
  }
}
import {Service, Context} from 'egg'

export default class UserService extends  Service{
  // 数据库Users模型
  private database:any;
  constructor(ctx: Context) {
    super(ctx);
    this.database = ctx.model.Users;
  }

  public async register(data: IRegisterData) {
    const {ctx} = this;
    const {code, name, phone, password, email} = data;
    const r_code = await ctx.service.redis.get(email);
    console.log('从数据库获取的验证码', r_code);
    console.log(typeof r_code);
    console.log(typeof code);
    // 校验验证码
    if(Number(r_code) === Number(code)) {
      return await this.database.create({name, phone, password, email})
    }

  }

  public async login(email: string, password: string) {
    const {ctx} = this;
    const uuid = ctx.helper.getUUID();
    const user = await this.database.findOne({
      where: {
        email,
        password
      }
    });

    if(!user) return null;
    const result = JSON.stringify(user);
    // 存入redis
    await ctx.service.redis.set(uuid, result, 60 * 60 * 24);
    return uuid
  }
}


interface IRegisterData {
  name: string,
  code: string,
  phone: string,
  email: string
  password: string
}



/**
 * @Author QJ
 * @date 2020--22 15:57
 * @desc connector.js
 */
import {Context} from "egg";

export default class UserConnector {
  private ctx: Context;
  constructor(ctx: Context) {
    this.ctx = ctx;
  }
  public async register(data: any) {
    const {ctx} = this;
    return await ctx.service.user.register(data);
  }


}

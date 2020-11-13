import {Context} from "egg";

export default class UtilsConnector {
  private ctx: Context;
  constructor(ctx: Context) {
    this.ctx = ctx;
    console.log('UtilsConnector 中的ctx', ctx);
  }
  public async sendEmail(email: string) {
    const {ctx} = this;
    const subject = '验证信息';
    const code = Math.random().toString(10).substr(2, 6);
    console.log('随机生成的code', code);
    // 存储验证码 5分钟后过期
    await ctx.service.redis.set(email, code, 60 * 5);
    const html = `<p>您的验证码为： <a href="#" style="color: deepskyblue">${code}</a></p>`
    return await ctx.service.tool.sendMail(email, subject, html);
  }
  public async githubURL() {
    const {login_url, client_id, scope} = this.ctx.app.config.github;
    return `${login_url}?client_id=${client_id}&scope=${scope}&state=${Date.now()}`
  }
}

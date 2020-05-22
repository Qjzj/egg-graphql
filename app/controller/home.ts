import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async code() {
    const {ctx} = this;
    const code = '520131';
    const email = '915851703@qq.com';
    const subject = '验证邮件';
    const html = `<p>您的验证码为 <span href="#" style="color: #42bdff">${code}</span>, 十五分钟后失效,如果不是您本人操作请忽略</p>`;

    try {
      await ctx.service.tool.sendMail(email, subject, html);
      ctx.body = {
        error_code: 1,
        message: '邮件发送成功'
      };
    }catch (e) {
      console.log('邮件发送失败', e);
      ctx.body = {
        error_code: 1,
        message: '邮件发送失败'
      };
    }
  }
}

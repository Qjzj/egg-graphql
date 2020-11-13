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

  public async github() {
    const {ctx, app} = this;
    const {code} = ctx.query;
    const {client_id, client_secret} = app.config.github;

    const tokenResult = await ctx.curl('https://github.com/login/oauth/access_token', {
      method: 'POST',
      contentType: 'json',
      data: {
        client_id,
        client_secret,
        code,
      },
      dataType: 'json',
      timeout: 8000,
    });

    if(tokenResult.data.error || tokenResult.status !== 200) {
      return ctx.body = {title: '获取github令牌出错了', message: tokenResult.data.error};
    }

    const {access_token} = tokenResult.data;
    const userResult = await ctx.curl(`https://api.github.com/user?access_token=${access_token}`, {
      dataType: 'json',
      timeout: 8000
    });

    if(userResult.data.error || userResult.status !== 200) {
      return ctx.body = {
        title: '获取用户数据出错了',
        message: userResult.data.error
      }
    }

    const {login, node_id} = userResult.data;
    if(!login || !node_id) {
      return ctx.body = '权限验证失败'
    }else {
      const uuid = ctx.helper.getUUID();
      // 查询数据库中是否存在该用户
      const oauth = await ctx.service.oauth.findById(node_id);
      if(!oauth) {
        // 数据中不存在该用户， 添加新用户
        userResult.data.oauth_type = 'Github';
        const user = await ctx.service.user.githuRegister(userResult.data);
        const userInfo = JSON.stringify(user);
        await ctx.service.redis.set(uuid, userInfo, 60 * 60 * 24);
      }else {
        await ctx.service.redis.set(uuid, oauth,  60 * 60 * 24);
      }
    }

    ctx.body = 'github 登录： ' + code;

  }
}

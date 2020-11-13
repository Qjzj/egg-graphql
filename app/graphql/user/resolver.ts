export default {
  Mutation: {
    // 发送邮件
    async sendEmail(_root: any, {email}, {connector}) {
      return await connector.utils.sendEmail(email);
    },
    // 注册
    async register(_root: any, {data}, {connector}) {
      return await connector.user.register(data);
    }
  },
  Query: {
    async githubURL(_root: any, {}, {connector}) {
      return await connector.utils.githubURL();
    }
  }
}

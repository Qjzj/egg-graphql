import {Context, Service} from 'egg'

export default class OauthService extends Service {
  private database: any;
  constructor(ctx: Context) {
    super(ctx);
    this.database = ctx.app.model.Oauth
  }
  public async findById(node_id: string) {
    const {ctx, app} = this;

    await this.database.findById();
  }
}


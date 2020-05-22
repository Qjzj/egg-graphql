import {Service} from 'egg'

export default class RedisService extends Service{
  async get(key: string) {
    const {app, ctx} = this;
    let result = await app.redis.get(key);
    if(!result) {
      return null
    }else {
      return ctx.helper.JSONParse(result)
    }
  }

  async set(key: string, value: any, seconds: number) {
    const {app} = this;
    value = JSON.stringify(value);
    if(!seconds) {
      return await app.redis.set(key, value)
    }else {
      return await app.redis.set(key, value, "EX", seconds);
    }

  }
}

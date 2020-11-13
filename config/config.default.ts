import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589439470518_4376';

  // add your egg config in here
  config.middleware = ['graphql'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    csrf: {
      ignore: () => true,
    }
  };

  // 配置graphql
  config.graphql = {
    router: '/graphql',
    app: true,                 // 是否加载到app   默认开启
    agent: false,              // 是否加载到agent 默认关闭
    graphiql: true,             // 是否加载开发者工具graphiql, 默认开启 路由同router字段 使用浏览器打开可见
    apolloServerOptions: {
      tracing: true,           // 设置为true， 以apollo跟踪格式收集和公开跟踪数据
      debug: true,             // 如果发生错误，它将打印其它调试日志记录
    }
  };
  // 配置egg-cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET, POST, HEAD, PUT, DELETE, PATCH'
  };

  // 配置sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'egg-sequelize-doc-default'
  };

  //  配置redis
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '123456',
      db: 0
    }
  };
  // 配置github
  config.github = {
    login_url: 'https://github.com/login/oauth/authorize',
    client_id: 'dd11ffcc0ad007eb5d88',
    client_secret: '158b51bffd14eda8d3647ad50be9625eb78e2bf0',
    scope: ['user']
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/code', controller.home.code);
  router.get('/github/callback', controller.home.github)
};

// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportOauth from '../../../app/service/Oauth';
import ExportRedis from '../../../app/service/Redis';
import ExportTest from '../../../app/service/Test';
import ExportTool from '../../../app/service/Tool';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    oauth: AutoInstanceType<typeof ExportOauth>;
    redis: AutoInstanceType<typeof ExportRedis>;
    test: AutoInstanceType<typeof ExportTest>;
    tool: AutoInstanceType<typeof ExportTool>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}

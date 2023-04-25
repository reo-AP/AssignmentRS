import * as Hapi from '@hapi/hapi';
import ProductRoutes from '../router/routes';
import {logger} from '../util/logger'
export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    logger.info('Router - Start adding routes');

    await new ProductRoutes().register(server);

    logger.info('Router - Finish adding routes');
  }
}
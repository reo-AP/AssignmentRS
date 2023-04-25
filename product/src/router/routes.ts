import * as Hapi from '@hapi/hapi';
import {logger} from '../util/logger';
import ProductController from '../controllers/product.controller'
import ProductModel from '../models/product.model';

export default class ProductRoutes {
  public async register(server: Hapi.Server): Promise<any> {
    const productModel = await (new ProductModel().createModel());
    return new Promise(resolve => {
      logger.info('ProductRoutes - Start adding product routes');

      const controller = new ProductController(productModel);

      server.route({
        method: 'GET',
        path: '/products',
        handler: controller.listProduct
    });
    
    server.route({
        method: 'GET',
        path: '/products/{id}',
        handler: controller.getProduct
    });
    
    server.route({
        method: 'POST',
        path: '/products/post',
        handler: controller.postProduct
    });
    
    server.route({
        method: 'DELETE',
        path: '/products/{id}',
        handler: controller.deleteProduct
    });
    
    server.route({
        method: '*',
        path: '/{file*}',
        handler: controller.unownPath
    });

      logger.info('ProductRoutes - Finish adding product routes');

      resolve(1);
    });
  }
}

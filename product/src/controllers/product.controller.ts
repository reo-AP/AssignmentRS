import Hapi from '@hapi/hapi'
import { logger } from '../util/logger';

export default class ProductController<T> {
  private Product: any; 
  constructor( productModel: any) {
    this.Product = productModel;
  }
  public listProduct = async (req: Hapi.Request ,h: any ) => {
    try{
      let list = await this.Product.find();
      logger.info({
        "level": "info",
        "message": "Products get all",
        "metadata": {status: list ? "Success" : "failure", service: "products"},
        "timestamp": new Date().toISOString()})
        h.response(list).header('Content-Type', 'application/json')
      return list;
    }catch(err: any){
      logger.error({
        "level": "error",
        "message": "Products get all",
        "metadata": {status: "failure", service: "products", issue: err.message},
        "timestamp": new Date().toISOString()})
      return {status: false}
    }
  }
  
  public getProduct = async (req: Hapi.Request ,h: any ) => {
      try{
        let product = await this.Product.find({productId: req.params.id});
        product = product[0];
        logger.info({
          "level": "info",
          "message": "Get Product By Id",
          "metadata": {status:"Success1", service: "products",id: req.params.id},
          "timestamp": new Date().toISOString()})
        return {name: product.name, price:product.price, productId: product.productId, company: product.company};
      }catch(err: any){
        logger.error({
          "level": "error",
          "message": "Get Product By Id",
          "metadata": {status: "failure", service: "products", issue: err.message, id:req.params.id },
          "timestamp": new Date().toISOString()})
        return {status: "Not Found"}
      }
    }
    
    public postProduct = async (req: Hapi.Request ,h: Hapi.ResponseToolkit ): Promise<any> => {
      try{
        let product = await this.Product.create(req.payload);
        logger.info({
          "level": "info",
          "message": "Create Product",
          "metadata": {status:"Success", service: "products"},
          "timestamp": new Date().toISOString()})
        return h.response(product);
      }catch(err: any){
        logger.error({
          "level": "error",
          "message": "Create Product",
          "metadata": {status: "failure", service: "products", issue: err.message},
          "timestamp": new Date().toISOString()})
        return {status: "Not Created"}
      }
    }
  
    public deleteProduct = async (req: Hapi.Request ,h: any ) => {
      try{
        let result = await this.Product.deleteOne({productId:req.params.id});
        logger.info({
          "level": "info",
          "message": "Delete Product",
          "metadata": {status:"Success", service: "products"},
          "timestamp": new Date().toISOString()})
        if(result.deletedCount)
        return {deleted: true};
        return {status: "Not Found"}
      }catch(err: any){
        logger.error({
          "level": "error",
          "message": "Delete Product",
          "metadata": {status: "failure", service: "products" , issue: err.message},
          "timestamp": new Date().toISOString()})
        return {status: "Not Found"}
      }
    }
  
    public unownPath = async (req: Hapi.Request ,h: any ) => {
      logger.error({
        "level": "error",
        "message": "Unknown path",
        "metadata": {status: "failure", service: "products" , issue: "unknown path"},
        "timestamp": new Date().toISOString()})
      return({status: "Path not found", code: 404})
    }
}


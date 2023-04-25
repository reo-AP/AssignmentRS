import Hapi from '@hapi/hapi'
import { Order } from '../models/order.model';
import { logger } from '../util/logger';

export const listOrders = async (req: Hapi.Request ,h: any ) => {
  try{
    let list = await Order.findAll();
    logger.info({
      "level": "info",
      "message": "Orderd get all",
      "metadata": {status: list ? "Success" : "failure", service: "orders"},
      "timestamp": new Date().toISOString()})
    return list;
  }catch(err: any){
    logger.error({
      "level": "error",
      "message": "Orders get all",
      "metadata": {status: "failure", service: "orders", issue: err.message},
      "timestamp": new Date().toISOString()})
    return {status: false}
  }
}

export const getOders = async (req: Hapi.Request ,h: any ) => {
    try{
      let order = await Order.findByPk(req.params.id); 
      logger.info({
        "level": "info",
        "message": "Get Orders By Id",
        "metadata": {status:"Success", service: "orders"},
        "timestamp": new Date().toISOString()})
      return {customerId: order.customerId, productId: order.productId, quantity: order.quantity};
    }catch(err: any){
      logger.error({
        "level": "error",
        "message": "Get Order By Id",
        "metadata": {status: "failure", service: "orders", issue: err.message},
        "timestamp": new Date().toISOString()})
      return {status: "Not Found"}
    }
  }

  export const postOrder = async (req: Hapi.Request ,h: any ) => {
    try{
      let order = await Order.create(req.payload);
      logger.info({
        "level": "info",
        "message": "Create Order",
        "metadata": {status:"Success", service: "orders"},
        "timestamp": new Date().toISOString()})
      return order;
    }catch(err: any){
      logger.error({
        "level": "error",
        "message": "Create Order",
        "metadata": {status: "failure", service: "orders", issue: err.message},
        "timestamp": new Date().toISOString()})
      return {status: "Not Created"}
    }
  }

  export const deleteOrder = async (req: Hapi.Request ,h: any ) => {
    try{
      let result = await Order.destroy({where: {id:req.params.id}});
      logger.info({
        "level": "info",
        "message": "Delete Order",
        "metadata": {status:"Success", service: "orders"},
        "timestamp": new Date().toISOString()})
      if(result)
      return {deleted: true};
      return {status: "Not Found"}
    }catch(err: any){
      logger.error({
        "level": "error",
        "message": "Delete Order",
        "metadata": {status: "failure", service: "orders" , issue: err.message},
        "timestamp": new Date().toISOString()})
      return {status: "Not Found"}
    }
  }

  export const unownPath = async (req: Hapi.Request ,h: any ) => {
    logger.error({
      "level": "error",
      "message": "Unknown path",
      "metadata": {status: "failure", service: "customers" , issue: "unknown path"},
      "timestamp": new Date().toISOString()})
    return({status: "Path not found", code: 404})
  }
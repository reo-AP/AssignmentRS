import Hapi from '@hapi/hapi'
import { logger } from '../util/logger';
var Customer = require('../models/customer.model')

export const listCustomer = async (req: Hapi.Request ,h: any ) => {
  try{
    let list = await Customer.find();
    logger.info({
      "level": "info",
      "message": "Customers get all",
      "metadata": {status: list ? "Success" : "failure", service: "costomers"},
      "timestamp": new Date().toISOString()})
    return list;
  }catch(err: any){
    logger.error({
      "level": "error",
      "message": "Customers get all",
      "metadata": {status: "failure", service: "customers", issue: err.message},
      "timestamp": new Date().toISOString()})
    return {status: false}
  }
}

export const getCustomer = async (req: Hapi.Request ,h: any ) => {
    try{
      let customer = await Customer.findOne({id: req.params.id});
      logger.info({
        "level": "info",
        "message": "Get Customer By Id",
        "metadata": {status:"Success", service: "customers"},
        "timestamp": new Date().toISOString()})
      return {name: customer.name, age:customer.age, contactNumber: customer.contactNumber,  address: customer.address};
    }catch(err: any){
      logger.error({
        "level": "error",
        "message": "Get Customer By Id",
        "metadata": {status: "failure", service: "customers", issue: err.message},
        "timestamp": new Date().toISOString()})
      return {status: "Not Found"}
    }
  }

  export const postCustomer = async (req: Hapi.Request ,h: any ) => {
    try{
      let customer = await Customer.create(req.payload);
      logger.info({
        "level": "info",
        "message": "Create Customer",
        "metadata": {status:"Success", service: "customers"},
        "timestamp": new Date().toISOString()})
      return customer;
    }catch(err: any){
      logger.error({
        "level": "error",
        "message": "Create Customer",
        "metadata": {status: "failure", service: "customers", issue: err.message},
        "timestamp": new Date().toISOString()})
      return {status: "Not Created"}
    }
  }

  export const deleteCustomer = async (req: Hapi.Request ,h: any ) => {
    try{
      let result = await Customer.delete({id:req.params.id});
      logger.info({
        "level": "info",
        "message": "Delete Customer",
        "metadata": {status:"Success", service: "customers"},
        "timestamp": new Date().toISOString()})
      if(result)
      return {deleted: true};
      return {status: "Not Found"}
    }catch(err: any){
      logger.error({
        "level": "error",
        "message": "Delete Customer",
        "metadata": {status: "failure", service: "customers" , issue: err.message},
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

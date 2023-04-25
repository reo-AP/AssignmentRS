'use strict';

import mongoose, {Schema, Document} from 'mongoose';


interface Product extends Document {
    name: string;
    price: string;
    company: string;
    productId: number
  }

  export default class ProductModel {  
  public createModel = async function(){
    const productModel: Schema = new Schema({
      productId: { type: Number, required: true, index: { unique: true } },
      name: { type: String, required: true },
      company: { type: String, required: true },
      price: { type: Number, required: true }
    });
 return mongoose.model<Product>('Product', productModel, 'products');
  } 
} 
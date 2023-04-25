 'use strict';

 import mongoose, {Schema, Document} from 'mongoose';
 
 
 interface Customer extends Document {
     id: string;
     name: string;
     age: number;
     contactNumber: number;
     address: string;
   }
 
 const customerModel: Schema = new Schema({
    id: { type: Number, required: true, index: { unique: true } },
   name: { type: String, required: true },
   age: { type: String, required: true },
   contactNumber: { type: Number, required: true },
   address: { type: String, required: true },
 });
 
 module.exports = mongoose.model<Customer>('Customer', customerModel, 'customers');
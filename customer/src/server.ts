'use strict'

import Hapi from '@hapi/hapi'
import { Server } from "@hapi/hapi";
import {connectMongoDB} from './db.config'
import {listCustomer, getCustomer, postCustomer, deleteCustomer, unownPath} from './controllers/customer.controller'

require('dotenv').config();


export let server: Server; 
export const init = async function(): Promise<Server> {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    });

    server.route({
        method: 'GET',
        path: '/customers',
        handler: listCustomer
    });

    server.route({
        method: 'GET',
        path: '/customers/{id}',
        handler: getCustomer
    });

    server.route({
        method: 'POST',
        path: '/customers/post',
        handler: postCustomer
    });

    server.route({
        method: 'DELETE',
        path: '/customers/{id}',
        handler: deleteCustomer
    });

    server.route({
        method: '*',
        path: '/{file*}',
        handler: unownPath
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    await connectMongoDB();
    
    return server;
}

process.on('unhandledRejection', (err: Error) => {
    console.log(err);
    process.exit(1);
})
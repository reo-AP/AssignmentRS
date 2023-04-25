'use strict'

import Hapi from '@hapi/hapi'
import { Server } from "@hapi/hapi";
import {sequelize} from './mysql_db.config'
import {listOrders, getOders, postOrder, deleteOrder, unownPath} from './controllers/order.controller'

require('dotenv').config();


export let server: Server; 
export const init = async function(): Promise<Server> {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    });

    
    server.route({
        method: 'GET',
        path: '/orders',
        handler: listOrders
    });

    server.route({
        method: 'GET',
        path: '/orders/{id}',
        handler: getOders
    });

    server.route({
        method: 'POST',
        path: '/orders/post',
        handler: postOrder
    });

    server.route({
        method: 'DELETE',
        path: '/orders/{id}',
        handler: deleteOrder
    });

    server.route({
        method: '*',
        path: '/{file*}',
        handler: unownPath
    });



    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    // sequelize.sync({force: true});
    
    return server;
}

process.on('unhandledRejection', (err: Error) => {
    console.log(err);
    process.exit(1);
})
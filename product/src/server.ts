'use strict'

import Hapi from '@hapi/hapi'
import { Server } from "@hapi/hapi";
import ConfigDB from './db.config'
import { logger as Logger } from './util/logger';
import Router from './router/router';

require('dotenv').config();

export default class AppServer {
    private static _instance: Server;
  
    public static async start(): Promise<Hapi.Server> {
      try {
        AppServer._instance = new Hapi.Server({
          port: process.env.PORT,
        });
        
        // AppServer._instance.validator(require('@hapi/joi'));
  
        await Router.loadRoutes(AppServer._instance);
  
        await AppServer._instance.start();
  
        Logger.info(
          `Server - Up and running at http://${process.env.HOST}:${process.env.PORT}`
        );
          
        await ConfigDB.connectMongoDB();
        console.log("Mongo DB connected");

        return AppServer._instance;
      } catch (error) {
        Logger.info(`Server - There was something wrong: ${error}`);
  
        throw error;
      }
    }
  
    public static stop(): Promise<Error | void> {
      Logger.info(`Server - Stopping execution`);
  
      return AppServer._instance.stop();
    }
  
    public static instance(): Hapi.Server {
      return AppServer._instance;
    }
  }
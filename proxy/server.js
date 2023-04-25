import Hapi from '@hapi/hapi'
import  H2o2  from '@hapi/h2o2';
import dotenv from 'dotenv';

dotenv.config(); 

const ports = {customers:8200 , products: 8400, orders: 8300};

export default Start = async function() {

    const server = Hapi.server({port: process.env.PORT,host: process.env.HOST});

    await server.register(H2o2);

    server.route({
        method: '*',
        path: '/products/{file*}',
        handler: {
          proxy: {
            host: 'localhost',
            port: ports["products"],
            protocol: 'http',
            passThrough: true,
            redirects: 5,
          }
        }
      });
      
      server.route({
          method: '*',
          path: '/customers/{file*}',
          handler: {
            proxy: {
              host: 'localhost',
              port: ports["customers"],
              protocol: 'http',
              passThrough: true,
              redirects: 5
            }
          }
        });
      
        server.route({
          method: '*',
          path: '/orders/{file*}',
          handler: {
            proxy: {
              host: 'localhost',
              port: ports["orders"],
              protocol: 'http',
              passThrough: true,
              redirects: 5
            }
          }
        });
      
  
    await server.start();
  
    console.log(`Server started at:  ${server.info.uri}`);
    
    return server
  };

Start();
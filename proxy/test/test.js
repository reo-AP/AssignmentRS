import Hapi from '@hapi/hapi'
import  H2o2  from '@hapi/h2o2';
import dotenv from 'dotenv';
import request from 'supertest';
import chai from 'chai'
let should = chai.should();
dotenv.config(); 

const ports = {customers:8200 , products: 8400, orders: 8300};

describe('Integrated test for proxy', function() {
    let server;
    beforeEach(async () => {
        if(!server)
        server = await start();
    });
    after(async () => {
      server.stop();
  })
  describe('Integrated test for proxy Product service',() => {
    it('responds with an array of Products', function(done) {
      request('http://localhost:3000')
        .get('/products')
        .expect(200)
        .expect('Content-Type', 'application/json')
        .end((err, res) => {               
          res.body.should.be.a('array');
      done();
    })
    })
    }),
    describe("Integrated test for proxy Orders service", () => {
    it('responds with an array of Orders', function(done) {
      request('http://localhost:3000')
        .get('/orders')
        .expect(200)
        .end((err, res) => {               
          res.body.should.be.a('array');
      done();
    });
    })
    }),
    describe("Integrated test for proxy Customers service", () => {
    it('responds with an array of Customers', function(done) {
      request('http://localhost:3000')
        .get('/customers')
        .expect(200)
        .end((err, res) => {               
          res.body.should.be.a('array');
      done();
    });
    });
  })
  });


let start = async function() {

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
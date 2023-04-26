let chai = require('chai');
const { default: AppServer } = require('../src/server.ts');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
const sinon = require("sinon");
require('dotenv').config()
import ProductController from '../src/controllers/product.controller'
import { logger } from '../src/util/logger';
let id = 120;

describe('Products Test', () => {
  let server;
  beforeEach(async () => {
    if(!AppServer.instance())
    server = await AppServer.start();
});

after(async () => {
    server.stop();
});

  describe('/products', () => {
      it('it should GET all the products', (done) => {
        const stubValue = [{
          "productId": 10,
          "name": "Some Product",
          "company": "Some COmpany",
          "price": 2,
      }]
        chai.request("http://localhost:8400")
            .get('/products')
            .end((err, res) => {              
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  chai.expect(stub.calledOnce).to.be.false;
              done();
            });
      });

      it('it should return an error', (done) => {
        chai.request("http://localhost:8400")
            .get('/products')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  describe('/products/:id Product with id', () => {
    it('it should return a single product object with given id', (done) => {
      chai.request("http://localhost:8400")
          .get(`/products/10`)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('price');
                res.body.should.have.property('company');
                res.body.should.have.property('productId').eq(10);
            done();
          });
    });

    it('it should return a not found response', (done) => {
      chai.request("http://localhost:8400")
          .get('/products/1000')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eq("Not Found");
            done();
          });
      });
    });

    describe('/products post', () => {
      it('post product', (done) => {
        chai.request("http://localhost:8400")
        .post('/products/post')
        .send({
          "productId": id,
          "name": "Some Product",
          "company": "Some COmpany",
          "price": 2,
          })
        .end((err, res) => {              
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('name');
                  res.body.should.have.property('price');
                  res.body.should.have.property('company');
                  res.body.should.have.property('productId')
              done();
            });
      });

      it('it should return an error', (done) => {
        chai.request("http://localhost:8400")
            .post('/products/post')
            .send({
              "productId": id,
              "name": "Some Product",
              "company": "Some COmpany",
              "price": 2,
          })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object')
                  res.body.should.have.property('status').eq('Not Created');
              done();
            });
      });
  });

  describe('/products delete', () => {
    it('delete product', (done) => {
      chai.request("http://localhost:8400")
      .delete('/products/120')
      .end((err, res) => {              
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('deleted').eq(true);
            done();
          });
    });

    it('it should return an error', (done) => {
      chai.request("http://localhost:8400")
          .delete('/products/120')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('status').eq('Not Found');
            done();
          });
    });
});

describe('route not found', () => {
  it('route not found', (done) => {
    chai.request("http://localhost:8400")
    .delete('/products/somerandomroute/120')
    .end((err, res) => {   
              res.should.have.status(process.env.PORT2);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eq("Path not found");
          done();
        });
  });
})

});

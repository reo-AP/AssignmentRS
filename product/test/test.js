let chai = require('chai');
const { default: AppServer } = require('../src/server.ts');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
const sinon = require("sinon");
import ProductController from '../src/controllers/product.controller'



describe('Products Test', () => {
  let server;
  beforeEach(async () => {
    if(!AppServer.instance())
    server = await AppServer.start();
});

afterEach(async () => {
    // await server.stop();
});

  describe('/products', () => {
      it('it should GET all the products', (done) => {
        const stubValue = [{
          "productId": 10,
          "name": "Some Product",
          "company": "Some COmpany",
          "price": 2,
      }]
      ProductController = new ProductController();
        const stub = sinon.stub(ProductController, 'listProduct').returns(stubValue);
        chai.request("http://localhost:8400")
            .get('/products')
            .end((err, res) => {              
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  chai.expect(stub.calledOnce).to.be.false;
              done();
            });
      });

      it('it should eturn an error', (done) => {
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

});

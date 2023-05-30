const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes')
const { closePool } = require('../db.js');
const { mockProducts, mockProductById, mockProductStyles, mockRelatedProducts } = require('./mockdata');

app.use('/products', router);

afterAll(async () => {
  await closePool();
});

describe('GET /products', () => {
  it('Should return an array of the first 5 products', async () => {
    await request(app)
      .get('/products')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(5)
        expect(res.body[0].id).toBe(1)
        expect(res.body[0].id).toEqual(mockProducts[0].id)
      })
  })
  it('Should return a count of 10 products', async () => {
    await request(app)
      .get('/products')
      .query({ count: 10 })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(10)
        expect(res.body[9].id).toBe(10)
      })
  })
  it('Should return products starting on page 5', async () => {
    await request(app)
      .get('/products')
      .query({ page: 5 })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body[0].id).toBe(6)
      })
  })
});

describe('GET /products/:product_id', () => {
  it('Should return a product object with an id = 1', async () => {
    await request(app)
      .get('/products/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(typeof res.body).toBe('object')
        expect(res.body.id).toEqual(mockProductById.id)
        expect(res.body.name).toEqual(mockProductById.name)
      })
  })
  it('Should contain a features property of which its value is an array', async () => {
    await request(app)
      .get('/products/1')
      .then((res) => {
        expect(res.body).toHaveProperty('features')
        expect(Array.isArray(res.body.features)).toBeTruthy()
      })
  })
  test('/products/1 should match the properties of the mockProductById object', async () => {
    await request(app)
      .get('/products/1')
      .then((res) => {
        expect(res.body.slogan).toEqual(mockProductById.slogan)
        expect(res.body.features.length).toEqual(mockProductById.features.length)
        expect(res.body.features[0].feature).toEqual(mockProductById.features[0].feature)
        expect(res.body.features[0].value).toEqual(mockProductById.features[0].value)
      })
  })
});

describe('GET /products/:product_id/styles', () => {
  it('Should contain a "results" property of which its value is an array', async() => {
    await request(app)
      .get('/products/2000/styles')
      .then((res) => {
        expect(res.body).toHaveProperty('results')
        expect(Array.isArray(res.body.results)).toBeTruthy()
      })
  })
  test('"Results" should contain a photos property which contains objects with "thumbnail_url" and "url" properties', async() => {
    await request(app)
      .get('/products/2000/styles')
      .then((res) => {
        expect(res.body.results[0]).toHaveProperty('photos')
        expect(Array.isArray(res.body.results[0].photos)).toBeTruthy()
        expect(res.body.results[0].photos[0]).toHaveProperty('thumbnail_url')
        expect(res.body.results[0].photos[0]).toHaveProperty('url')
      })
  })
  it('Should contain a "skus" property which contains objects with properties "quantity" and "size"', async() => {
    await request(app)
      .get('/products/2000/styles')
      .then((res) => {
        expect(res.body.results[0]).toHaveProperty('skus')
        expect(Object.keys(res.body.results[0].skus).length).toEqual(Object.keys(mockProductStyles.results[0].skus).length)
        expect(res.body.results[0].skus['22914']).toBeDefined()
        expect(res.body.results[0].skus['22914']).toHaveProperty('quantity')
        expect(res.body.results[0].skus['22914']).toHaveProperty('size')
      })
  })
});

describe('GET /products/:product_id/related', () => {
  it('Should return an array of related product ids', async () => {
    await request(app)
      .get('/products/1/related')
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(4)
        expect(res.body[0]).toEqual(mockRelatedProducts[0])
      })
  })
})

const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
const { sumArray, pluck } = require('../utils');

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
    it('responds with the sum of 2 and 4', () =>
      agent.post('/sum')
        .send({a: 2, b: 4})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('function sumArray', ()=>{
    const arr = [1,2,3,4]
    it('si encuentra la suma retorna true', ()=>{
      expect(sumArray(arr, 5)).toBe(true)
    })
    it('si no encuentra la suma retorna false', ()=>{
      expect(sumArray(arr, 85)).toBe(false)
    })
    it('si no le paso un array como primer parametro arroja un error', ()=>{
      expect(() => sumArray(1, 85)).tothrow(TypeError)
    })
    it('no deberia sumar dos veces el mismo numero', ()=>{
      expect(sumArray(arr, 2)).toBe(false)
    })
  })

  describe('POST /sumArray', () => {
    it('responde con 400 si no le envio los datos correctos', () => agent.post('/sumArray').expect(400));
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));

    it('devuelve true si la suma de alguno de los numeros del array es igual a num', () =>
       agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
  });

  describe('POST a /numString', ()=>{
    it('responds with 200', () => agent.post('/numString').send({word: 'hola'}).expect(200));
    it('responde con 400 si el string es un numero', () => agent.post('/numString').send({word: 1}).expect(400));
    it('responde con 400 si el string esta vacio', () => agent.post('/numString').send({word: ''}).expect(400));

    
    it('Si le mando hola que devuelva 4', ()=>{
      agent.post('/numString')
      .send({word: 'hola'})
      .then(res => {
        expect(res.body.result).toBe(4)
      })
    })
  })

  describe('function pluck', ()=>{
    const arr = [{nombre: "Ale", apellido: "Cabrera"}, {nombre: "Juan", apellido: "Perez"}]
    it('retorna un array con solo nombres', ()=>{
      expect(pluck(arr, 'nombre')).toEqual(['Ale', 'Juan'])
    })
  })

  describe('POST /pluck', ()=>{
    const arr = [{nombre: "Ale", apellido: "Cabrera"}, {nombre: "Juan", apellido: "Perez"}]
    it('responds with 200', () => agent.post('/pluck').send({array: arr, prop: 'nombre'}).expect(200));
    it ('si le mando el array que me devuelva los nombres', ()=>{
      agent.post('/pluck')
      .send({array: arr, prop: 'nombre'})
      .then((res)=>{
        espect(res.body.result).toEqual(['Ale', 'Juan'])
      })
    })
  })

});


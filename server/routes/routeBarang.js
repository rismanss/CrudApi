'use strict';
const db = require('./../models');
const fs = require('fs');

let name = Date.now().toString();
const handleFileUpload = file => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./uploads/'+ file.hapi.filename, file._data, err => {
       if (err) {
        reject(err);
       }
       resolve(file)
    })
  })
 }

exports.routeBarang = (server) => {
  return server.route([{
    method: 'GET',
    path: '/',
    handler: () => {
      return db.Barang.findAll();
    }
  },{
    method: 'GET',
    path: '/{id}',
    handler: (request) => {
      return db.Barang.findByPk(request.params.id);
    }
  },{
    method: 'GET',
    path: '/upload/{file}',
    handler: {
      directory: {
        path: 'uploads'
      }
    }
  },{
    method: 'POST',
    path: '/',
    options: {
      payload: {
        output: 'stream',
      }
    },
    handler: (request) => {
      const dataSave = request.payload.gambar;
      handleFileUpload(dataSave);
      const data = db.Barang.create({
        gambar: dataSave.hapi.filename,
      });
      return data;
    }
  },{
    method: ['PUT', 'PATCH'],
    path: '/{id}',
    options: {
      payload: {
        output: 'stream',
      }
    },
    handler: async (request) => {
      const dataSave = request.payload.gambar;
      const updateById = await db.Barang.findByPk(request.params.id);
      updateById.update({
        gambar: dataSave ? dataSave.hapi.filename : updateById.gambar,
        namaBarang: request.payload.namaBarang,
        deskripsi: request.payload.deskripsi,
        hargaBarang: request.payload.hargaBarang
      });

      if(dataSave) {
        handleFileUpload(dataSave);
      } 
      
      return updateById;
    }
  },{
    method: 'DELETE',
    path: '/{id}',
    handler: async (request) => {
      const deleteById = await db.Barang.findByPk(request.params.id)

      return deleteById.destroy()
    }
  }]);
}
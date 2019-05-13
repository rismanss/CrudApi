'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define('Barang', {
    namaBarang: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    hargaBarang: DataTypes.INTEGER,
    gambar: DataTypes.STRING
  }, {});
  Barang.associate = function(models) {
    // associations can be defined here
  };
  return Barang;
};
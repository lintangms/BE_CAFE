// const { request, response } = require("express")
const detailOftransaksiModel = require(`../models/index`).detail_transaksi
const transaksiModel = require(`../models/index`).transaksi
const userModel = require(`../models/index`).user
const mejaModel = require(`../models/index`).meja

const Op = require(`sequelize`).Op
const Sequelize = require("sequelize");
const sequelize = new Sequelize("ukkkafe", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

exports.getAlltransaksi = async (request, response) => {
  let user = await userModel.findAll();
  return response.json({
    success: true,
    data: user,
    message: `ini adalah semua data user`,
  })
}

exports.addtransaksi = async (request, response) => {
  let meja = request.body.meja;
  let mejaa = await mejaModel.findOne({
      where:{
          [Op.and]: [{meja: {[Op.substring]: meja}}],
      },
      attributes: [
          "id_meja",
          "meja",
          "status_meja",
          "createdAt",
          "updatedAt",
        ],
  });

  let nama_user = request.body.nama_user;
  let id_user = await userModel.findOne({
      where: {
        [Op.and]: [{ nama_user: { [Op.substring]: nama_user } }],
      },
    });

    if (mejaa === null) {
      return response.json({
        success: false,
        message: `meja yang anda inputkan tidak ada`,
      });
    } else if (id_user === null) {
      return response.json({
        success: false,
        message: `User yang anda inputkan tidak ada`,
      });
    }else{
      let newtransaksi = {
        tgl_transaksi: Date(),
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status
  
      };

      let mejaCheck = await sequelize.query(
          `SELECT * FROM transaksi WHERE id_meja = ${mejaa.id_meja}`
        );
        if (mejaCheck[0].length === 0) {
          transaksiModel
            .create(newtransaksi)
            .then((result) => {
              let id_transaksi = result.id_transaksi;
              let detailsOftransaksi = request.body.details_of_transaksi;

              for (let i = 0; i < detailsOftransaksi.length; i++) {
                  detailsOftransaksi[i].id_transaksi = id_transaksi;
                }

                let newDetail = {
                  id_transaksi: id_transaksi,
                  id_menu: detailsOftransaksi[0].id_menu,
                  harga: detailsOftransaksi[0].harga,
                };

                
        detailOftransaksiModel
        .create(newDetail)
        .then((result) => {
          return response.json({
            success: true,
            message: `New transaction has been inserted`,
          });
        })
        .catch((error) => {
          return response.json({
            success: false,
            message: error.message,
          });
        });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
} else {
  return response.json({
    success: false,
    message: `meja yang anda pesan sudah di booking`,
  });
}
}
};

exports.updatetransaksi = async (request, response) => {

  let idTransaksi = request.params.id
  let transaksi = {
    tgl_transaksi: Date(),
    id_user: request.body.id_user,
    id_meja: request.body.id_meja,
    nama_pelanggan: request.body.nama_pelanggan,
    status: request.body.status
  }
  transaksiModel.update(transaksi, { where: { id_transaksi: idTransaksi } })
      .then(result => {
          return response.json({
              success: true,
              message: `Data terupdate`,
              data: result
          })
      })
      .catch(error => {
          return response.json({
              success: false,
              message: error.message,
          })
      })
}


exports.deletetransaksi = async (request, response) => {
  let idtransaksi = request.params.id

  transaksiModel.destroy({ where: { id: idtransaksi } })
      .then(result => {
          return response.json({
              success: true,
              message: `Data tipe transaksi has been deleted`
          })
      })
      .catch(error => {
          return response.json({
              success: false,
              message: error.message
          })
      })}
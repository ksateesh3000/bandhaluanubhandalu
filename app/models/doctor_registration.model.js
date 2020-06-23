
var encryption = require('../helpers/Encryption');

module.exports = (sequelize, Sequelize) => {
    const doctor_registration = sequelize.define("doctor_registration_tbl", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      doctor_name: {
        type: Sequelize.STRING
      },
      course: {
        type: Sequelize.STRING
      },
      tutorials_id:{
        type:Sequelize.INTEGER
      }
    },{
      getterMethods:{
        first_name: function(){ return encryption.decryptData(this.getDataValue('first_name')); },
        last_name: function(){ return encryption.decryptData(this.getDataValue('last_name')); },
        
      },
      setterMethods:{
        first_name: function(value){ this.setDataValue('first_name', encryption.encryptData(value)); },
        last_name: function(value){ this.setDataValue('last_name', encryption.encryptData(value)); },
        
      }
    });
    return doctor_registration;
  };
  

var encryption = require('../helpers/Encryption');
module.exports = (sequelize, Sequelize) => {
  const Tutorial_address = sequelize.define("tutorial_address", {
    colony: {
      type: Sequelize.STRING
    },
    Address: {
      type: Sequelize.STRING
    },
    tutorials_id:{
      type:Sequelize.INTEGER
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tutorial_address;
};

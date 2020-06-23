
var encryption = require('../helpers/Encryption');
module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  },{
		getterMethods:{
			title: function(){ return encryption.decryptData(this.getDataValue('title')); },
			description: function(){ return encryption.decryptData(this.getDataValue('description')); },
			
		},
		setterMethods:{
			title: function(value){ this.setDataValue('title', encryption.encryptData(value)); },
			description: function(value){ this.setDataValue('description', encryption.encryptData(value)); },
			
		}
	} );

  return Tutorial;
};

const db = require("../models");
const Tutorial = db.tutorials;
const registration = db.registration;
const Tutorial_address = db.Tutorial_address;
const Op = db.Sequelize.Op;

const dbConfig = require("../config/db.config.js");
var jwt = require("jsonwebtoken");
var encryption = require('../helpers/Encryption');

var Sequelize = require('')


// Login Token Generation ---//

 exports.tokengeneration=function(req, res)
 { 
var token = jwt.sign({}, dbConfig.SECRET);
console.log("token gen--", token)
res.send({
  message: "Tutorial was  successfully Generator Token."
});
 }
exports.logout = function(req, res)
{
  
  sessions = {};
  sessions.token = "";
  sessions.authorization = "";
  req.headers.cookie = {};
  req.headers={};
  req.session = null;

  res.send({
    message: "Session successfully Cleard."
  });
}


// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
    




    const doctorregst = {
      first_name: req.body.title,
      last_name: req.body.description,
      doctor_name: "dfsdfsdfsf",
      course:"sdfdsfsdf",
      tutorials_id: data.dataValues.id
    };
    registration.create(doctorregst);
    res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
     
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {

  
//   Tutorial.aggregate([{ 
//     $lookup : {
//         localField : "id", 
//         from : registration, 
//         foreignField : "tutorials_id", 
//         as : "p"
//     }
// }
// , { 
//   $group : {
//     id : {"p᎐empname" : "$p.empname"},                 
// }
// }, 
//            ]);




    

Tutorial.hasMany(registration, {foreignKey:'tutorials_id'})
//registration.belongsTo(Tutorial, {foreignKey:'id'});
Tutorial.hasMany(Tutorial_address, {foreignKey:'tutorials_id'})


    

Tutorial.findAll({
include: [{
model:registration,
required:true
   }, {model:Tutorial_address,
    required:true}]
}).then(postsdata=> {


/* ... */
});



// Tutorial.hasMany(registration, {foreignKey: 'id'});


// //registration.belongsTo(Tutorial, {foreignKey: 'id'});


// //Tutorial.findAll({ where: {}, include: [registration]});

// Tutorial.findAll({
//   include: [{
//     model: registration,
//     required: true
//    },
//   {}]
// }).then(postsdata => {
  
//   /* ... */
// });

// Tutorial.findAll({ attributes: ['registration.tutorials_id'],
// include: [
//   {
//       model: registration,
//       attributes: [],
//       include: []
//   }
// ],
// group: ['registration.tutorials_id'],
// raw:true})





  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err});
    });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({_id: ObjectID(id)})
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({status: 500, error: err});
      });
  });

  router.post('/', (req, res) => {
    const newData = req.body;
    collection
    .insertOne(newData)
    .then((result) => {
      res.json(result.ops[0])
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err });
    });
  });

  router.delete('/:id', (req,res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id)})
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({status: 500, error: err});
      });
  });

  router.put('/:id', (req,res) => {
    const id = req.params.id;
    const newRoom = req.body;
    delete newRoom._id;
    collection
      .findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: newRoom },
        { returnOriginal: false}
      )
      .then((result) => {res.json(result.value)
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
        console.log(err);
      });
  });

  return router;
};

module.exports = createRouter;

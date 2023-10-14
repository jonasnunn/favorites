const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("favorites")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
  // console.log(result);
};

const getSingle = async (req, res, next) => {
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("favorites")
    .find({ _id: bookId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const postBook = async (req, res, next) => {
  const newContact = {
    title: req.body.title,
    author: req.body.author,
    ranking: req.body.ranking,
  };
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("favorites")
    .insertOne(newContact);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(
        result.error || "ERROR: Something went wrong, this book was not added."
      );
  }
};

const editBook = async (req, res, next) => {
  const bookId = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    author: req.body.author,
    ranking: req.body.ranking,
  };
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("favorites")
    .replaceOne({ _id: bookId }, book);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "ERROR: The book could not be updated.");
  }
};

const deleteBook = async (req, res, next) => {
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("favorites")
    .deleteOne({ _id: bookId }, true);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(result.error || "ERROR: The contact was not able to be deleted");
  }
};

module.exports = {
  getAll,
  getSingle,
  postBook,
  editBook,
  deleteBook
};

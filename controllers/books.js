const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("books")
    .find();
    if (result)
  {
    result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists)
      });
    }
  else {
      res
        .status(500)
        .json(
          result.error || "ERROR: Something went wrong, this book could not be found."
        );
  };
};

const getSingle = async (req, res, next) => {
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("books")
    .find({ _id: bookId });
  if (result)
  {
    result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0])
      });
    }
  else {
      res
        .status(500)
        .json(
          result.error || "ERROR: Something went wrong, this book could not be found."
        );
  };
};

const postBook = async (req, res, next) => {
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    ranking: req.body.ranking,
    genre: req.body.genre,
    wordCount: req.body.wordCount,
    year: req.body.year,
    series: req.body.series,
  };
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("books")
    .insertOne(newBook);
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
    genre: req.body.genre,
    wordCount: req.body.wordCount,
    year: req.body.year,
    series: req.body.series,
  };
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("books")
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
    .collection("books")
    .deleteOne({ _id: bookId }, true);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(result.error || "ERROR: The contact was not able to be deleted");
  }
};


const postUser = async (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("users")
    .insertOne(newUser);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(
        result.error || "ERROR: Something went wrong, this user was not added."
      );
  }
};





module.exports = {
  getAll,
  getSingle,
  postBook,
  editBook,
  deleteBook,
  postUser
};

const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllShows = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("favorites")
    .collection("shows")
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
          result.error || "ERROR: Something went wrong, this show could not be found."
        );
  };
};

const getShow = async (req, res, next) => {
    const showId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("favorites")
      .collection("shows")
      .find({ _id: showId });
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
            result.error || "ERROR: Something went wrong, this show could not be found."
          );
    };
};

const postShow = async (req, res, next) => {
    const newShow = {
      title: req.body.title,
      director: req.body.director,
      ranking: req.body.ranking,
      genre: req.body.genre,
      episodes: req.body.episodes,
      year: req.body.year,
      seasons: req.body.seasons,
    };
    const result = await mongodb
      .getDb()
      .db("favorites")
      .collection("shows")
      .insertOne(newShow);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res
        .status(500)
        .json(
          result.error || "ERROR: Something went wrong, this show was not added."
        );
    }
};


  const putShow = async (req, res, next) => {
    const showId = new ObjectId(req.params.id);
    const show = {
        title: req.body.title,
        director: req.body.director,
        ranking: req.body.ranking,
        genre: req.body.genre,
        episodes: req.body.episodes,
        year: req.body.year,
        seasons: req.body.seasons,
    };
    const result = await mongodb
      .getDb()
      .db("favorites")
      .collection("shows")
      .replaceOne({ _id: showId }, show);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(result.error || "ERROR: The show could not be updated.");
    }
};

const deleteShow = async (req, res, next) => {
    const showId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("favorites")
      .collection("shows")
      .deleteOne({ _id: showId }, true);
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(result.error || "ERROR: The show was not able to be deleted");
    }
};

module.exports = {
    getAllShows,
    getShow,
    postShow,
    putShow,
    deleteShow
}
const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");
let db
const getAllRestaurants = (req, res) => {
    const pageCount = parseInt(req.query.page, 10) || 0;
    const restPerPage = 10;
    db = getDb()
    let restaurants = [];
    const restaurantName = req.query.name ? new RegExp(req.query.name, 'i') : null;
    const query = restaurantName ? { name: restaurantName } : {};
    db.collection("restaurants")
        .find(query)
        .skip(pageCount * restPerPage).limit(restPerPage)
        .forEach((book) => {
            restaurants.push(book);
        })
        .then(() => {
            res.status(200).json({ message: "all Restaurants fetched from db", data: restaurants });
        })
        .catch(() =>
            res.status(500).json({
                error: "error in fetching data from db",
            })
        );
}
const viewRestaurant = (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db = getDb()
        db.collection("restaurants")
            .findOne({ _id: new ObjectId(req.params.id) })
            .then((doc) => {
                res.status(200).json({ ...doc, name: "mike" });
            })
            .catch(() =>
                res.status(500).json({
                    error: "error in fetching data from db",
                })
            );
    } else {
        res.status(500).json({
            error: "invalid doc id",
        })
    }

}
const addRestaurant = (req, res) => {
    db = getDb()
    const book = req.body
    db.collection("restaurants")
        .insertOne(book)
        .then((postResult) => {
            res.status(200).json({ message: "posted successfully", history_book: { ...book, name: "new author" }, result: postResult });
        })
        .catch(() =>
            res.status(500).json({
                error: "error in posting data in db",
            })
        );
}
const updateRestaurant = (req, res) => {
    const updatedBook = req.body
    if (ObjectId.isValid(req.params.id)) {
        db = getDb()
        db.collection("restaurants")
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedBook })
            .then((postResult) => {
                res.status(200).json({ message: "updated successfully", history_book: { ...updatedBook, name: "update author" }, result: postResult });
            })
            .catch(() =>
                res.status(500).json({
                    error: "error in updating data in db",
                })
            );
    } else {
        res.status(500).json({
            error: "invalid doc id",
        })
    }
}
const deleteRestaurant = (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db = getDb()
        db.collection("restaurants")
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then((result) => {
                res.status(200).json({ message: "book deleted successfully!", status: result });
            })
            .catch(() =>
                res.status(500).json({
                    error: "error in deleting data from db",
                })
            );
    } else {
        res.status(500).json({
            error: "invalid doc id",
        })
    }
}
module.exports = { getAllRestaurants, viewRestaurant, addRestaurant, updateRestaurant, deleteRestaurant }
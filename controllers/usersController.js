const { getDb } = require("../db/connect");
let db
const login = (req, res) => {
    db = getDb()
    db.collection("users")
        .findOne({ email: req.query.email })
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch(() =>
            res.status(500).json({
                error: "error in fetching data from db",
            })
        );
}
module.exports = login
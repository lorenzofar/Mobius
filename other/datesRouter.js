const express = require("express");
const db = require("./dbManager");
const qh = require("./queryHelper");
var router = express.Router();

router.get("/", (req, res) => {
    db.query(
        "SELECT DISTINCT DATE_TRUNC('day', dt) AS date FROM events;",
        (err, result) => {
            if (err) res.status(500).json(null);
            else {
                let dates = result.rows.map(r => r.date);
                res.status(200).json(dates);
            }
        }
    );
});

module.exports = router;
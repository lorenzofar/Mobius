const express = require("express");
const db = require("./dbManager");
const qh = require("./queryHelper");
var router = express.Router();

router.get("/", (req, res) => {
    db.query(
        qh.select(["*"], "news"),
        (err, result) => {
            if (err) res.status(500).json(null);
            else res.status(200).json(result.rows);
        }
    );
});

module.exports = router;
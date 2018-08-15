const express = require("express");
const db = require("./dbManager");
var router = express.Router();

router.get("/", (req, res) => {
    db.query(
        `SELECT a.id, a.name, a.pic, COUNT(r.id) AS events FROM artists a INNER JOIN relations r ON a.id = r.artist GROUP BY a.id, a.name, a.pic ORDER BY a.name`,
        (err, result) => {
            if (err) res.status(500).json(null);
            else res.status(200).json(result.rows);
        }
    );
});

module.exports = router;
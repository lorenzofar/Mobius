const express = require("express");
const db = require("./dbManager");
var router = express.Router();

router.get("/", (req, res) => {
    db.query(
        `SELECT a.id, a.name, a.pic, COUNT(r.id) AS events FROM artists a LEFT JOIN relations r ON a.id = r.artist GROUP BY a.id, a.name, a.pic ORDER BY a.name`,
        (err, result) => {
            if (err) res.status(500).json(null);
            else res.status(200).json(result.rows);
        }
    );
});

router.get("/:id", (req, res) => {
    let id = req.params.id;
    db.query(
        `SELECT 
            a.name,
            a.bio, 
            a.pic,
            a.website, 
            array_agg(row_to_json(row(e.id, e.name, e.dt, e.type))) AS events
        FROM artists a 
        LEFT JOIN relations r ON a.id = r.artist 
        LEFT JOIN events e ON e.id = r.event 
        WHERE a.id = ${id}
        GROUP BY   
            a.name,
            a.bio, 
            a.pic,
            a.website
            `,
        (err, result) => {
            if (err) res.status(500).json(null);
            else if (!result.rowCount) res.status(404).json(null);
            else res.status(200).json(result.rows[0]);
        }
    );
});

module.exports = router;
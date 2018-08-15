const express = require("express");
const db = require("./dbManager");
var router = express.Router();

router.get("/", (req, res) => {
    db.query( //TODO: Fix events with no artists (side)
        `SELECT 
            e.id,    
            e.name,
            e.description, 
            e.dt,
            e.location, 
            e.kind,
            array_agg(DISTINCT a.name) AS artists
        FROM events e 
        LEFT JOIN relations r ON r.event = e.id 
        LEFT JOIN artists a ON a.id = r.artist 
        GROUP BY 
            e.id,    
            e.name,
            e.description, 
            e.dt,
            e.location, 
            e.kind`,
        (err, result) => {
            if (err) res.status(500).json(null);
            else res.status(200).json(result.rows);
        }
    );
});

module.exports = router;
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

router.get("/:id", (req, res) => {
    let id = req.params.id;
    db.query(
        `SELECT 
            e.name,
            e.description, 
            e.dt,
            e.location, 
            e.kind,
            e.pic,
            array_agg(row_to_json(row(a.id, a.name, a.pic))) AS artists 
        FROM events e 
        LEFT JOIN relations r ON e.id = r.event 
        LEFT JOIN artists a ON a.id = r.artist 
        WHERE e.id = ${id}
        GROUP BY   
            e.name,
            e.description, 
            e.dt,
            e.location, 
            e.kind,
            e.pic`,
            (err, result) => {
                if(err) res.status(500).json(null);
                else if(!result.rowCount) res.status(404).json(null);
                else res.status(200).json(result.rows[0]);
            }
    )
})

module.exports = router;
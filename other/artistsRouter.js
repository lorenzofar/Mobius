const express = require("express");
const db = require("./dbManager");
var router = express.Router();

const sort_regex = /^(asc|desc|ASC|DESC)$/;

router.get("/", (req, res) => {
  let q = req.query;
  let sort = "";
  let selector = "a.id, a.name, a.pic";
  let events_count = ", COUNT(r.event) AS events";
  let events_joiner = " LEFT JOIN performances r ON a.id = r.artist";

  if (q && q.fields) {
    selector = q.fields
      .split(",")
      .filter(f => f != "events")
      .map(f => `a.${f}`)
      .join(",");
    if (q.fields.indexOf("events") === -1) {
      events_count = "";
      events_joiner = "";
    } else if (q.fields === "events")
      // Remove the comma at the start of the query
      events_count = events_count.replace(",", "");
  }
  if (q && q.sort && sort_regex.test(q.sort)) sort = q.sort;
  // If the 'name' field is not requested we cannot order the artist by alphabetical order.
  // Hence ordering is performed only if the 'name' field is present
  let order = selector.indexOf("a.name") == -1 ? "" : `ORDER BY a.name ${sort}`;
  let query = `SELECT ${selector} ${events_count} FROM artists a ${events_joiner} ${selector.length === 0  ? "GROUP BY a.id" : "GROUP BY"} ${selector} ${order}`;
  db.query(
    query,
    (err, result) => {
      if (err) res.status(500).json([]);
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
        LEFT JOIN performances r ON a.id = r.artist 
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

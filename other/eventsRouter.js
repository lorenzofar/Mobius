const express = require("express");
const db = require("./dbManager");
var router = express.Router();

router.get("/", (req, res) => {
  let date = req.query && req.query.date;
  let type = req.query && req.query.type;
  let search_string = "";
  date = date && date.split("T")[0];
  if (date || type) {
    search_string += "WHERE ";
    date = date && `DATE_TRUNC('day', e.dt) = '${date}'`;
    type = type && `e.type = '${type.toLowerCase()}'`;
    let search = [date, type].filter(i => i != null && i != ""); // Only get valid parameters
    search_string += search.reduce((s1, s2) => `${s1} AND ${s2}`); // combine them to build a query string
  }

  let selector = "e.id, e.name, e.dt, e.location, e.type";
  let artists_collector = ", array_agg(DISTINCT a.name) AS artists";
  let artists_joiner =
    "LEFT JOIN performances r ON r.event = e.id LEFT JOIN artists a ON a.id = r.artist";

  let q = req.query;
  if (q && q.fields) {
    selector = q.fields
      .split(",")
      .filter(f => f != "artists")
      .map(f => `e.${f}`)
      .join(",");
    if (q.fields.indexOf("artists") === -1) {
      artists_collector = "";
      artists_joiner = "";
    } else if (q.fields === "artists")
      // Remove the comma at the start of the query
      artists_collector = artists_collector.replace(",", "");
  }

  let query = `SELECT ${selector} ${artists_collector} FROM events e ${artists_joiner} ${search_string} ${
    selector.length === 0 ? "GROUP BY e.id" : `GROUP BY ${selector}`
  } ${selector.indexOf("dt") !== -1 ? "ORDER BY dt ASC" : ""}`;
  db.query(query, (err, result) => {
    if (err) res.status(500).json([]);
    else res.status(200).json(result.rows);
  });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let q = req.query;
  let selector = `
    e.name,
    e.description,
    e.dt,
    e.location,
    e.type`;
  let artists_agg = `, array_agg(row_to_json(row(a.id, a.name, a.pic))) AS artists `;
  let artists_join = `LEFT JOIN performances r ON e.id = r.event LEFT JOIN artists a ON a.id = r.artist `;
  if (q && q.fields) {
    selector = q.fields
      .split(",")
      .filter(f => f != "artists")
      .map(f => `e.${f}`)
      .join(",");
    if (q.fields.indexOf("artists") === -1) {
      artists_agg = "";
      artists_join = "";
    } else if (q.fields === "artists")
      // Remove the comma at the start of the query
      artists_agg = artists_agg.replace(",", "");
  }
  let query = `SELECT ${selector} ${artists_agg}
      FROM events e ${artists_join} 
      WHERE e.id = ${id}
      ${selector.length === 0 ? "" : `GROUP BY ${selector}`}`;
  db.query(query, (err, result) => {
    if (err) res.status(500).json([]);
    else if (!result.rowCount) res.status(404).json([]);
    else res.status(200).json(result.rows[0]);
  });
});

module.exports = router;

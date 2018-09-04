const express = require("express");
const db = require("./dbManager");
const moment = require("moment");
var router = express.Router();

const sort_regex = /^(asc|desc|ASC|DESC)$/;

router.get("/", (req, res) => {
  let q = req.query;
  let sort = "";
  if (q && q.sort && sort_regex.test(q.sort)) sort = q.sort;
  db.query(
    `SELECT DISTINCT DATE_TRUNC('day', dt) AS date FROM events ORDER BY date ${sort}`,
    (err, result) => {
      if (err) res.status(500).json(null);
      else {
        let dates = result.rows.map(r => moment.utc(r.date).toISOString());
        res.status(200).json(dates);
      }
    }
  );
});

module.exports = router;

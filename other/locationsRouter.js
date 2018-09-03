const express = require("express");
const db = require("./dbManager");
const qh = require("./queryHelper");
var router = express.Router();

router.get("/", (req, res) => {
  let q = req.query;
  let fields = q.fields ? q.fields.split(",") : [];
  let columns = fields.length ? fields : ["*"];
  db.query(qh.select(columns, "locations"), (err, result) => {
    if (err) res.status(500).json([]);
    else {
      let out = result.rows.map(r => {
        if (r.directions) {
          r.directions = r.directions.map(d => {
            let st = d.split("~");
            let o = {
              transport: st[0],
              directions: st[1]
            };
            return o;
          });
        }
        return r;
      });
      res.status(200).json(out);
    }
  });
});

module.exports = router;

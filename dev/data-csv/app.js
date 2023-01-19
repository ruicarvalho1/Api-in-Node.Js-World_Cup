const csv = require("csvtojson");
const fs = require("fs");
const { Pool } = require("pg"); // use the 'pg' module to connect to the database
const fastcsv = require("fast-csv");

// Connection details for the PostgreSQL database
const pool = new Pool({
  host: "127.0.0.1",
  user: "ipvc",
  database: "Data_Base_SD",
  password: "admin",
  port: 54320,
});

pool.connect();

(async () => {
  const data = await csv().fromFile("data.csv");

  //console.log(data);

  const competitions = [];
  //console.log(queryCompetition);

  for (let line of data) {
    if (line.Year && !competitions.includes(line.Year)) {
      competitions.push("(" + parseInt(line.Year) + ")");
      //console.log(line.Year);
    }
  }

  const promises = competitions.map((competition) => {
    console.log(
      `INSERT INTO competitions (year) VALUES ${[competition]} RETURNING *`
    );
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO competitions (year) VALUES ${[competition]}RETURNING *`,
        [competition],
        (err, res) => {
          if (err) {
            console.error(err.stack);
            reject(err);
          } else {
            console.log(
              `Inserted ${res.rowCount} row for competitions ${competition}`
            );
            resolve();
          }
        }
      );
    });
  });

  Promise.all(promises)
    .then(() => {
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  console.log(competitions);
})();

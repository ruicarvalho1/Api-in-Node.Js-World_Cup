const csv = require("csvtojson");
const { Client } = require("pg");

const pool = new Client({
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

  competitions.forEach((competition) => {
    //console.log(`INSERT INTO competitions (year) VALUES ${[competition]}`);
    pool.query(
      `INSERT INTO competitions (year) VALUES ${[competition]}`,
      [competition],
      (err, res) => {
        if (err) {
          console.error(err.stack);
        } else {
          console.log(
            `Inserted ${res.rowCount} row for competitions ${competition}`
          );
        }
      }
    );
    pool.end();
  });

  //console.log(competitions);
})();

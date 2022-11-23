const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://wubldpvqcoclgs:2a6e7694f3c05f2aeedb2a38571c5878ae9a480c87fe88349e11e46dc5b1fd08@ec2-18-208-55-135.compute-1.amazonaws.com:5432/d1h9qqudj0mg3", // process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


// Create Guess Lines table
client.query('CREATE TABLE guess_lines (name varchar(20), matchId varchar(20), spread real, total real);', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
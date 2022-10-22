import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config(); //Read .env file lines as though they were env vars.

//Call this script with the environment variable LOCAL set if you want to connect to a local db (i.e. without SSL)
//Do not set the environment variable LOCAL if you want to connect to a heroku DB.

//For the ssl property of the DB connection config, use a value of...
// false - when connecting to a local DB
// { rejectUnauthorized: false } - when connecting to a heroku DB
const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

const client = new Client(dbConfig);
client.connect();

app.get("/", async (req, res) => {
  const dbres = await client.query('select * from users');
  res.json(dbres.rows);
});


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

// GET/ users
app.get("/users", async (req, res) => {
  const dbres = await client.query('select * from users')
  res.json(dbres.rows);
})

// GET/ single user :id
app.get<{ id: string }, {}, {}>("/users/:id", async (req, res) => {
  const user_id = parseInt(req.params.id);
  const dbres = await client.query(
    "select * from users where user_id = $1",
    [user_id]
  );
})

// GET all skills for user:id
app.get<{ id: string }, {}, {}>("/users/:id/skills", async (req, res) => {
  const user_id = parseInt(req.params.id);
  const dbres = await client.query(
    "select * from skills join skill_assignments on skills.id = skill_assignments.skill_id" +
    "join users on users.id = skill_assignments.mentor_id where users.id = $1",
    [user_id] 
  )
})

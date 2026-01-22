import express from "express";
import knex from "knex";

const app = express();
const port = 3000;

// This connects to the database stored in the file mentioned below
const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite3",
  },
  useNullAsDefault: true,  // Omit warning in console
});

app.get("/", (req, res) => {
  res.send("Hello from exercise 2!");
});

// Here is an example of the first route, /all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC;");
  res.json(rows);
});

// TODO implement more routes here
app.get("/unconfirmed-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users WHERE confirmed_at IS NULL ORDER BY id ASC;");
  res.json(rows);
});

app.get("/gmail_users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users WHERE email LIKE '%@gmail.com%' ORDER BY id ASC;");
  res.json(rows);
});

app.get("/2022_users", async (req, res) => {
  const created2022 = await knexInstance.raw("SELECT * FROM users WHERE created_at LIKE '%2022%';");
  res.json(created2022);
});

app.get("/user-count", async (req, res) => {
  const totalCount = await knexInstance.raw("SELECT COUNT(*) AS count FROM users;");
  res.json(totalCount);
});

app.get("/last-name-count", async (req, res) => {
  const rows = await knexInstance.raw("SELECT last_name, COUNT(*) AS count FROM users GROUP BY last_name ORDER BY last_name DESC;");
  res.json(rows);
} );

app.get("/first-user", async (req, res) => {
  const result = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC LIMIT 1;");
  const firstUser = result[0];
  if (!firstUser) {
      return res.status(404).json({ error: "No users found" });
    }
  res.json(firstUser);
});
// Get the most recently created user 
app.get("/last-created", async (req, res) => {
  const result = await knexInstance.raw("SELECT * FROM users ORDER BY created_at DESC LIMIT 1;");
  const lastCreatedUser = result[0];
  res.json(lastCreatedUser);
}); 

// Search for users by their first name
app.get("/search-user", (req, res) => {
  res.send(`
    <h1>Find a User</h1>
    <form method="GET" action="/search-user/result">
      <label>Enter name: <input type="text" name="name" required></label>
      <button type="submit">Search</button>
    </form>
  `);
});
app.get("/search-user/result", async (req, res) => {  
  const {name} = req.query;
  const rows = await knexInstance.raw(`SELECT * FROM users WHERE first_name LIKE '%${name}%'`);
  if (rows.length === 0) {
    return res.status(404).json({ error: "User with this name not found" });
  }
  res.json(rows);
});


// Add some html response for total users

app.get("/total-users", async (req, res) => {
  const result = await knexInstance.raw("SELECT COUNT(*) AS count FROM users;");
  const totalCount = result[0].count;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        .count {
          font-weight: bold;
          color: #2c7be5;
        }
      </style>
    </head>
    <body>
      <h3>There are <span class="count">${totalCount}</span> users in total.</h3>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
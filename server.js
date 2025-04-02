const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const MYURLBASES = "http://20.244.56.144/evaluation-service";
const MYACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjAwMTg3LCJpYXQiOjE3NDM1OTk4ODcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBmOWNiNzBmLTMxNzktNDExNC1hODFiLWM3ZWQ2OWNjNTY3ZSIsInN1YiI6IjIyMDUyMzc2QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MjM3NkBraWl0LmFjLmluIiwibmFtZSI6ImF5dXNoIHNyaXZhc3RhdmEiLCJyb2xsTm8iOiIyMjA1MjM3NiIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6IjBmOWNiNzBmLTMxNzktNDExNC1hODFiLWM3ZWQ2OWNjNTY3ZSIsImNsaWVudFNlY3JldCI6IllqUUNQVEd2bVB1a1J0SnQifQ.6WxzcM5-t0mRJfEJlC0Bkxo9Kd_i9aA1SQBv3ZlMp2E"; // Replace with valid token

const ains = axios.create({
  headers: { Authorization: `Bearer ${MYACCESS_TOKEN}` },
});

app.use(cors());

const cache = new Map();

app.get("/users", async (req, res) => {
  try {
    if (cache.has("top_users")) return res.json(cache.get("top_users"));

    const { data: ur } = await ains.get(`${MYURLBASES}/users`);
    const { data: pr } = await ains.get(`${MYURLBASES}/posts`);

    const users = ur.users;
    const posts = pr.posts;

    const upc = {};
    posts.forEach((post) => {
      upc[post.userId] = (upc[post.userId] || 0) + 1;
    });

    const tu = Object.entries(upc)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([userId, count]) => {
        const user = users.find((u) => u.id == userId);
        return {
          id: userId,
          name: user ? user.name : "Unknown",
          postCount: count,
        };
      });

    cache.set("top_users", tu);
    res.json(tu);
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

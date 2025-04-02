const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const MYURLBASES = "http://20.244.56.144/evaluation-service";
const MYACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjAwMTg3LCJpYXQiOjE3NDM1OTk4ODcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBmOWNiNzBmLTMxNzktNDExNC1hODFiLWM3ZWQ2OWNjNTY3ZSIsInN1YiI6IjIyMDUyMzc2QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MjM3NkBraWl0LmFjLmluIiwibmFtZSI6ImF5dXNoIHNyaXZhc3RhdmEiLCJyb2xsTm8iOiIyMjA1MjM3NiIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6IjBmOWNiNzBmLTMxNzktNDExNC1hODFiLWM3ZWQ2OWNjNTY3ZSIsImNsaWVudFNlY3JldCI6IllqUUNQVEd2bVB1a1J0SnQifQ.6WxzcM5-t0mRJfEJlC0Bkxo9Kd_i9aA1SQBv3ZlMp2E";

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${MYACCESS_TOKEN}` },
});

app.get("/users", async (req, res) => {
  try {
    const { data: users } = await axiosInstance.get(`${MYURLBASES}/users`);
    const { data: posts } = await axiosInstance.get(`${MYURLBASES}/posts`);

    const upc = {};
    posts.forEach((post) => {
      upc[post.userId] = (upc[post.userId] || 0) + 1;
    });

    const bu = Object.entries(upc)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([userId, count]) => {
        const user = users.find((u) => u.id == userId);
        return { id: userId, name: user?.name, postCount: count };
      });

    res.json(bu);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const { type } = req.query;
    const { data: posts } = await axiosInstance.get(`${MYURLBASES}/posts`);
    const { data: comments } = await axiosInstance.get(
      `${MYURLBASES}/comments`
    );

    if (type === "popular") {
      const pcc = {};
      comments.forEach((comment) => {
        pcc[comment.postId] = (pcc[comment.postId] || 0) + 1;
      });

      const maxCount = Math.max(...Object.values(pcc));

      const tp = posts.filter((post) => pcc[post.id] === maxCount);
      return res.json(tp);
    }

    if (type === "latest") {
      const lp = posts
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);
      return res.json(lp);
    }

    res.status(400).json({ error: "Invalid type parameter" });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

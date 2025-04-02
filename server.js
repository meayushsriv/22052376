const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const MYURLBASES = "http://20.244.56.144/evaluation-service";
const MYACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjAwMTg3LCJpYXQiOjE3NDM1OTk4ODcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBmOWNiNzBmLTMxNzktNDExNC1hODFiLWM3ZWQ2OWNjNTY3ZSIsInN1YiI6IjIyMDUyMzc2QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MjM3NkBraWl0LmFjLmluIiwibmFtZSI6ImF5dXNoIHNyaXZhc3RhdmEiLCJyb2xsTm8iOiIyMjA1MjM3NiIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6IjBmOWNiNzBmLTMxNzktNDExNC1hODFiLWM3ZWQ2OWNjNTY3ZSIsImNsaWVudFNlY3JldCI6IllqUUNQVEd2bVB1a1J0SnQifQ.6WxzcM5-t0mRJfEJlC0Bkxo9Kd_i9aA1SQBv3ZlMp2E";
